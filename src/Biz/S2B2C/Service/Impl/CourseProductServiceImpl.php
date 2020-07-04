<?php

namespace Biz\S2B2C\Service\Impl;

use AppBundle\Common\ArrayToolkit;
use Biz\BaseService;
use Biz\Common\CommonException;
use Biz\Course\CourseException;
use Biz\Course\CourseSetException;
use Biz\Course\Dao\CourseDao;
use Biz\Course\Dao\CourseSetDao;
use Biz\Course\Service\CourseService;
use Biz\Course\Service\CourseSetService;
use Biz\Course\Service\LessonService;
use Biz\S2B2C\Dao\CourseChapterDao;
use Biz\S2B2C\Dao\ProductDao;
use Biz\S2B2C\S2B2CProductException;
use Biz\S2B2C\Service\CourseProductService;
use Biz\S2B2C\Service\ProductService;
use Biz\S2B2C\Service\S2B2CFacadeService;
use Biz\System\Service\CacheService;
use Biz\System\Service\LogService;
use Biz\System\Service\SettingService;
use Monolog\Logger;

/**
 * Class CourseProductServiceImpl
 */
class CourseProductServiceImpl extends BaseService implements CourseProductService
{
    const SYNC_STATUS_FINISHED = 'finished';

    const SYNC_STATUS_ERROR = 'error';

    /**
     * @param $s2b2cProductId
     *
     * @return bool
     *
     * @throws
     * 更新课程的计划列表
     */
    public function syncCourses($s2b2cProductId)
    {
        $s2b2cConfig = $this->getS2B2CFacadeService()->getS2B2CConfig();

        if (empty($s2b2cConfig['supplierId'])) {
            $this->createNewException(CommonException::ERROR_PARAMETER_MISSING());
        }

        $waitSyncProducts = $this->getS2B2CProductDao()->findBySupplierIdAndRemoteProductId($s2b2cConfig['supplierId'], $s2b2cProductId);
        if (empty($waitSyncProducts)) {
            return true;
        }

        $courseSets = array_filter($waitSyncProducts, function ($product) {
            return 'course_set' == $product['productType'];
        });
        $courseSetProduct = ArrayToolkit::get(array_values($courseSets), 0, []);

        $content = $this->getDistributeContent($courseSetProduct['s2b2cProductDetailId']);
        if (empty($content)) {
            return false;
        }
        $newCourseSet = $this->getCourseSetService()->addCourseSet($this->prepareCourseSetData($content));
        $this->getProductService()->updateProduct($courseSetProduct['id'], ['localResourceId' => $newCourseSet['id'], 'syncStatus' => self::SYNC_STATUS_FINISHED]);

        $courseProducts = array_filter($waitSyncProducts, function ($product) {
            return 'course' == $product['productType'];
        });
        $courseHasDefaultCourse = false;
        foreach ($courseProducts as $product) {
            $course = $this->getDistributeContent($product['s2b2cProductDetailId']);
            $course['courseSetId'] = $newCourseSet['id'];
            $course['courseSetTitle'] = $newCourseSet['title'];
            $course['platform'] = 'supplier';
            $localCourse = $this->getCourseService()->createCourse($course);

            $this->getProductService()->updateProduct($product['id'], [
                'localResourceId' => $localCourse['id'],
                'localVersion' => $course['editVersion'],
                'suggestionPrice' => $course['suggestionPrice'],
                'cooperationPrice' => $course['cooperationPrice'],
                'remoteResourceId' => $course['id'],
                'syncStatus' => self::SYNC_STATUS_FINISHED,
                ]);

            $this->biz['s2b2c.course_product_sync']->sync($course, ['syncCourseId' => $localCourse['id']]);

            if ($course['isDefault']) {
                // 如果供应商原课程中有默认计划，则直接同步
                $courseHasDefaultCourse = true;
                $this->getCourseSetService()->updateDefaultCourseId($newCourseSet['id'], $localCourse['id']);
            }
        }

        // 如果供应商原课程中没有默认计划，则按默认规则生成
        if (!$courseHasDefaultCourse) {
            $this->getCourseSetService()->updateCourseSetDefaultCourseId($newCourseSet['id']);
        }
    }

    protected function getDistributeContent($s2b2cProductDetailId)
    {
        $content = $this->getS2B2CFacadeService()->getS2B2CService()->getDistributeContent($s2b2cProductDetailId);
        if (!empty($content['status']) && 'success' == $content['status']) {
            return $content['data'];
        }

        return null;
    }

    protected function prepareCourseSetData($courseSetData)
    {
        return [
            'syncStatus' => 'waiting',
            'sourceCourseSetId' => $courseSetData['id'],
            'title' => $courseSetData['title'],
            'type' => $courseSetData['type'],
            'sourceCourseId' => $courseSetData['defaultCourseId'],
            'subtitle' => $courseSetData['subtitle'],
            'summary' => $courseSetData['summary'],
            'cover' => $courseSetData['cover'],
            'maxCoursePrice' => $courseSetData['maxCoursePrice'],
            'minCoursePrice' => $courseSetData['minCoursePrice'],
            'platform' => 'supplier',
        ];
    }

    public function updateProductVersionData($remoteProductId)
    {
        $config = $this->getS2B2CFacadeService()->getS2B2CConfig();
        $courseProduct = $this->getS2B2CProductService()->getProductBySupplierIdAndRemoteProductIdAndType($config['supplierId'], $remoteProductId, 'course');
        if (empty($courseProduct)) {
            //需要采购
            $courseSetProduct = $this->purchaseNewCourse($remoteProductId);

            if (!$courseSetProduct) {
                return ['status' => false, 'error' => '更新失败'];
            }

            $courseSet = $this->getCourseSetService()->getCourseSet($courseSetProduct['localResourceId']);

            $this->syncCourses($courseSet, $courseSetProduct);

            return ['status' => true, 'error' => ''];
        }

        $course = $this->getCourseService()->getCourse($courseProduct['localResourceId']);

        return $this->updateCourseVersionData($course['id']);
    }

    protected function purchaseNewCourse($remoteProductId)
    {
        $product = $this->getS2B2CFacadeService()->getSupplierPlatformApi()->getSupplierProductDetail($remoteProductId);

        $settings = $this->getSettingService()->get('storage', []);
        $supplierSettings = $this->getS2B2CFacadeService()->getS2B2CConfig();

        if (empty($product)) {
            $this->biz->offsetGet('s2b2c.merchant.logger')->error('[purchaseNewCourse] 没有可采购的产品，productId:'.$remoteProductId);

            return false;
        }

        $purchaseProduct = $product['course'];

        $purchaseProducts = [
            [
                'product_id' => $purchaseProduct['id'],
                'product_type' => 'course',
                'access_key' => $settings['cloud_access_key'],
                'supplier_id' => $supplierSettings['supplierId'],
                'cooperation_price' => $purchaseProduct['cooperationPrice'],
                'suggestion_price' => $purchaseProduct['suggestionPrice'],
                's2b2cDistributeId' => $remoteProductId,
                'selling_price' => $purchaseProduct['suggestionPrice'],
            ],
        ];

        $purchaseRecord = [
            'parent_id' => $product['id'],
            'parent_title' => $product['title'],
            'type' => 'course',
            'product_ids' => [$product['course']['id']],
        ];

        $result = $this->getS2B2CFacadeService()->getSupplierPlatformApi()->checkPurchaseProducts($purchaseProducts);

        if (empty($result['success']) || true != $result['success']) {
            $this->biz->offsetGet('s2b2c.merchant.logger')->error('[purchaseNewCourse:checkPurchaseProducts()] ', $result);

            return false;
        }

        $purchaseResult = $this->getS2B2CFacadeService()->getS2B2CService()->purchaseProducts($purchaseProducts, $purchaseRecord);

        if (empty($purchaseResult['status']) || 'success' != $purchaseResult['status']) {
            $this->biz->offsetGet('s2b2c.merchant.logger')->error('[purchaseNewCourse:purchaseProducts()] ', $result);

            return false;
        }

        return $this->getS2B2CProductService()->getProductBySupplierIdAndRemoteResourceIdAndType($supplierSettings['supplierId'], $product['id'], 'course_set');
    }

    public function updateCourseVersionData($courseId)
    {
        $course = $this->getCourseService()->getCourse($courseId);
        $product = $product = $this->getProductService()->getByTypeAndLocalResourceId('course', $course['id']);
        $courseSetProduct = $this->getProductService()->getByTypeAndLocalResourceId('course_set', $course['courseSetId']);
        $this->biz->offsetGet('s2b2c.merchant.logger')->info("开始尝试更新课程(#{$courseId})到最新版本");
        if (empty($course)) {
            $this->getLogger()->error('课程不存在，拒绝操作');

            return ['status' => false, 'error' => '更新失败'];
        }
        if (self::SYNC_STATUS_FINISHED !== $product['syncStatus']) {
            $this->getLogger()->error("课程 - {$course['courseSetTitle']}(courseSetId#{$course['courseSetId']}) 状态异常，无法处理", ['syncStatus' => $product['syncStatus']]);

            return ['status' => false, 'error' => '更新失败'];
        }

        try {
            $this->beginTransaction();
            $sourceCourse = $this->tryGetSupplierProductSyncData($product['remoteProductId']);
            if ($product['localVersion'] >= $sourceCourse['editVersion']) {
                $this->getLogger()->info("课程 - {$course['courseSetTitle']}(courseSetId#{$course['courseSetId']}) 版本已经是最新，无需处理", ['nowVersion' => $product['localVersion'], 'sourceVersion' => $sourceCourse['editVersion']]);

                $this->commit();

                return ['status' => false, 'error' => '版本已经是最新，无需处理'];
            }
            $this->biz['s2b2c.course_product_sync']->updateToLastedVersion($sourceCourse, ['syncCourseId' => $courseId]);

            $syncCourse = $this->getProductService()->updateProduct($product['id'], ['localVersion' => $sourceCourse['editVersion'], 'changelog' => []]);
            //课程没有版本号，只有计划有，所以升级后版本号归1默认值
            $this->getProductService()->updateProduct($courseSetProduct['id'], ['localVersion' => 1, 'remoteVersion' => 1]);
            $this->getLogger()->info("[syncCourseProduct] 更新课程到最新 - {$course['courseSetTitle']}(courseSetId#{$course['courseSetId']}) 成功", ['courseId' => $course['id']]);
            $this->getLogService()->info('course', 'update', "(#{$courseId})《{$course['courseSetTitle']}》更新版本到最新成功,版本变动：V{$product['localVersion']}->V{$sourceCourse['editVersion']}", ['userId' => $this->getCurrentUser()->getId()]);
            $this->commit();
        } catch (\Exception $e) {
            $this->rollback();
            $this->getLogger()->error("[syncCourseProduct] 更新课程到最新 - {$course['courseSetTitle']}(courseSetId#{$course['courseSetId']}) 失败", ['message' => $e->getMessage(), 'errorFile' => $e->getFile().$e->getLine(), 'error' => $e->getTraceAsString()]);
            $this->getLogService()->error('course', 'update', "(#{$courseId})《{$course['courseSetTitle']}》更新版本到最新失败，版本无变化：V{$product['localVersion']}", ['userId' => $this->getCurrentUser()->getId()]);
            $errorMsg = in_array($e->getCode(), [5001730, 5001731]) ? $e->getMessage() : '更新失败';

            return ['status' => false, 'error' => $errorMsg];
        }

        return ['status' => true, 'error' => ''];
    }

    /**
     * @param $productType
     * @param $remoteResourceId
     *
     * @return bool
     *
     * @throws \Exception
     * @codeCoverageIgnore
     */
    public function setProductHasNewVersion($productType, $remoteResourceId)
    {
        //获取更新的课程和计划
        $s2b2cConfig = $this->getS2B2CFacadeService()->getS2B2CConfig();
        $product = $this->getProductService()->getProductBySupplierIdAndRemoteResourceIdAndType($s2b2cConfig['supplierId'], $remoteResourceId, $productType);
        if (empty($product)) {
            $this->createNewException(S2B2CProductException::NOT_FOUND_PRODUCT());
        }
        $course = $this->getCourseService()->getCourse($product['localResourceId']);
        $courseSet = $this->getCourseSetService()->getCourseSet($course['courseSetId']);
        $courseSetProduct = $this->getProductService()->getProductBySupplierIdAndLocalResourceIdAndType($s2b2cConfig['supplierId'], $courseSet['id'], 'course_set');
        if (empty($courseSetProduct) || self::SYNC_STATUS_FINISHED != $courseSetProduct['syncStatus']) {
            $this->createNewException(S2B2CProductException::NOT_FOUND_PRODUCT());
        }
        $this->getLogger()->info("[setProductHasNewVersion] 商品(#{$courseSet['id']}-{$courseSet['title']})存在新版本，进行更新字段", ['productId' => $product['remoteResourceId']]);

        //检验远程的数据是否有更新
        $productDetail = $this->getS2B2CFacadeService()->getSupplierPlatformApi()->getSupplierProductDetail($product['remoteProductId']);
        $productVersions = $this->getS2B2CFacadeService()->getSupplierPlatformApi()->getProductVersions($product['remoteResourceId']);
        if (!empty($productVersions['error']) || empty($productDetail['course']) || (!empty($productVersions) && $product['remoteResourceId'] != $productVersions[0]['productId'])) {
            return false;
        }

        //更新Changelog,标记有新版本生成
        $productVersions = $this->getProductService()->generateVersionChangeLogs($product['localVersion'], $productVersions);
        $hasNewVersion = $this->getCacheService()->get('s2b2c.hasNewVersion') ?: [];
        if (empty($hasNewVersion['courseSet'])) {
            $this->getCacheService()->set('s2b2c.hasNewVersion', array_merge($hasNewVersion, ['courseSet' => 1]));
        }
        //课程当前没有Version,所以本地版本+1
        $this->getProductService()->updateProduct($courseSetProduct['id'], [
            'remoteVersion' => $courseSetProduct['localVersion'] + 1,
        ]);

        return $this->getProductService()->updateProduct($product['id'], [
            'remoteVersion' => $productDetail['course']['editVersion'],
            'changelog' => $productVersions,
        ]);
    }

    /**
     * @param $products
     * 下架对应商品
     * @codeCoverageIgnore
     */
    public function closeProducts($products)
    {
        foreach ($products as $product) {
            if ('closed' != $product['syncStatus']) {
                $this->getLogger()->info("[closeSupplierCourseProduct] 开始关闭采购商品#{$product['id']}");
                try {
                    if ('course' == $product['productType']) {
                        $this->getCourseDao()->update($product['localResourceId'], ['status' => 'closed']);
                    }

                    if ('course_set' == $product['productType']) {
                        $this->getCourseSetDao()->update($product['localResourceId'], ['status' => 'closed']);
                    }
                } catch (\Exception $e) {
                    $this->getLogger()->info("[closeSupplierCourseProduct] 关闭具体商品类型{$product['productType']}#{$product['localResourceId']}，操作出现问题，忽略");
                }
                $this->getLogger()->info("[closeSupplierCourseProduct] 关闭采购商品#{$product['id']}，操作成功");
            }
        }
    }

    /**
     * @param $s2b2cProductId
     * @param $remoteCourseId
     * @param $priceFields
     *
     * @return bool
     *
     * @throws \Exception
     * @codeCoverageIgnore
     */
    public function syncProductPrice($s2b2cProductId, $remoteCourseId, $priceFields)
    {
        $this->beginTransaction();
        try {
            $s2b2cConfig = $this->getS2B2CFacadeService()->getS2B2CConfig();

            $product = $this->getProductService()->getByProductIdAndRemoteResourceIdAndType($s2b2cProductId, $remoteCourseId, 'course');

            if (empty($product)) {
                $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
            }

            $product = $this->getProductService()->updateProduct($product['id'], ArrayToolkit::parts($priceFields, ['suggestionPrice', 'cooperationPrice']));
            $course = $this->getCourseService()->getCourse($product['localResourceId']);

            $this->biz->offsetGet('s2b2c.merchant.logger')->info('[syncProductPrice] $merchantSetting', $s2b2cConfig);

            if (isset($s2b2cConfig['businessMode']) && S2B2CFacadeService::FRANCHISEE_MODE == $s2b2cConfig['businessMode']) {
                $this->getCourseService()->updateCourseMarketing($course['id'], array_merge($course, ['originPrice' => $priceFields['suggestionPrice']]));
            }
            $this->commit();

            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->getLogger()->error('[syncProductPriceError]'.$e->getMessage());
            throw $e;
        }
    }

    /**
     * @param $s2b2cProductId
     * @param $remoteCourseId
     *
     * @return bool|mixed
     *
     * @throws \Exception
     * @codeCoverageIgnore
     */
    public function closeCourse($s2b2cProductId, $remoteCourseId)
    {
        $this->beginTransaction();
        try {
            $product = $this->getProductService()->getByProductIdAndRemoteResourceIdAndType($s2b2cProductId, $remoteCourseId, 'course');

            if (empty($product)) {
                $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
            }

            $this->getCourseService()->closeCourse($product['localResourceId']);
            $this->commit();

            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->getLogger()->error('[syncCloseCourse]'.$e->getMessage());
            throw $e;
        }
    }

    /**
     * @param $s2b2cProductId
     * @param $remoteCourseSetId
     *
     * @return bool|mixed
     *
     * @throws \Exception
     * @codeCoverageIgnore
     */
    public function closeCourseSet($s2b2cProductId, $remoteCourseSetId)
    {
        $this->beginTransaction();
        try {
            $product = $this->getProductService()->getByProductIdAndRemoteResourceIdAndType($s2b2cProductId, $remoteCourseSetId, 'course_set');

            if (empty($product)) {
                $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
            }

            $this->getCourseSetService()->closeCourseSet($product['localResourceId']);
            $this->commit();

            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->getLogger()->error('[synccloseCourseSet]'.$e->getMessage());
            throw $e;
        }
    }

    /**
     * @param $s2b2cProductId
     * @param $remoteResourceId
     * @param $lessonId
     *
     * @return bool|mixed
     *
     * @throws \Exception
     * @codeCoverageIgnore
     */
    public function closeTask($s2b2cProductId, $remoteResourceId, $lessonId)
    {
        $this->beginTransaction();
        try {
            $product = $this->getProductService()->getByProductIdAndRemoteResourceIdAndType($s2b2cProductId, $remoteResourceId, 'course');
            if (empty($product)) {
                $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
            }
            $lesson = $this->getCourseChapterDao()->getByCourseIdAndSyncId($product['localResourceId'], $lessonId);

            if (empty($lesson) || 'lesson' != $lesson['type']) {
                $this->getLogger()->error('不存在的课时 lessonSyncId:'.$lessonId.' lesson'.json_encode($lesson), $product);
                //todo 目前无法通过版本判断合适加入的task 暂时返回true
                return true;
            }

            if ('unpublished' == $lesson['status']) {
                $this->getLogger()->error('课时已经下架，无需操作 lessonSyncId:'.$lessonId);

                return true;
            }

            $result = $this->getCourseLessonService()->unpublishLesson($lesson['courseId'], $lesson['id']);

            $this->getLogger()->info('unPublishTask: '.json_encode($result));
            $this->commit();

            return true;
        } catch (\Exception $e) {
            $this->rollback();
            $this->getLogger()->error('[syncProductPriceError]'.$e->getMessage());
            throw $e;
        }
    }

    /**
     * @param $courseSet
     *
     * @return array|bool|null[]|string[]
     * @codeCoverageIgnore
     */
    public function deleteProductsByCourseSet($courseSet)
    {
        if ('supplier' != $courseSet['platform']) {
            return true;
        }

        try {
            $this->beginTransaction();
            $courses = $this->getCourseService()->findCoursesByCourseSetId($courseSet['id']);
            $courseSetProduct = $this->getProductService()->getByTypeAndLocalResourceId('course_set', $courseSet['id']);
            $courseProducts = $this->getProductService()->findProductsBySupplierIdAndProductTypeAndLocalResourceIds($courseSetProduct['supplierId'], 'course', ArrayToolkit::column($courses, 'id'));
            $productIds = ArrayToolkit::column($courseProducts, 'remoteResourceId');

            $this->getProductService()->deleteProduct($courseSetProduct['id']);
            $this->getProductService()->deleteByIds(ArrayToolkit::column($courseProducts, 'id'));
            $result = $this->getS2B2CFacadeService()->getS2B2CService()->changePurchaseStatusToRemoved($courseSetProduct['remoteResourceId'], $productIds, 'course');
            if (!isset($result['status']) || 'success' != $result['status']) {
                $this->createNewException(S2B2CProductException::REMOVE_PRODUCT_FAILED());
            }

            $this->commit();
        } catch (\Exception $e) {
            $this->rollback();
            $this->getLogger()->error(sprintf('[deleteProductsByCourseSetError] %s', $e->getMessage()));

            return false;
        }

        return true;
    }

    protected function validateCourseData($course, $product)
    {
        if (empty($course)) {
            $this->getLogger()->error('课程不存在，拒绝操作');

            return false;
        }
        if ('waiting' !== $product['syncStatus']) {
            $this->getLogger()->info("课程 - {$course['courseSetTitle']}(courseSetId#{$course['courseSetId']}) 无需处理", ['syncStatus' => $product['syncStatus']]);

            return false;
        }

        return true;
    }

    protected function tryGetSupplierProductSyncData($distributeId)
    {
        $sourceCourse = $this->getS2B2CFacadeService()->getSupplierPlatformApi()->getSupplierProductSyncData($distributeId);

        if (empty($sourceCourse['id'])) {
            $this->getLogger()->info('[syncCourseProduct] 获取源平台课程数据失败', ['DATA' => $sourceCourse]);
            throw $this->createServiceException('获取新版本课程数据失败，请稍后重试', 5001730);
        }
        if ('published' != $sourceCourse['editStatus']) {
            $this->getLogger()->info('[syncCourseProduct] 源平台课程正在编辑中，无法处理', ['DATA' => $sourceCourse]);
            throw $this->createServiceException('源平台课程正在编辑中，无法更新，请稍后再试', 5001731);
        }

        return $sourceCourse;
    }

    /**
     * @param $localCourseId
     *
     * @throws \Exception
     *                    检查计划是否有操作权限
     * @codeCoverageIgnore
     */
    public function checkCourseStatus($localCourseId)
    {
        $this->checkMerchantStatus();
        $s2b2cConfig = $this->getS2B2CFacadeService()->getS2B2CConfig();
        $courseProduct = $this->getProductService()->getProductBySupplierIdAndLocalResourceIdAndType($s2b2cConfig['supplierId'], $localCourseId, 'course');

        $sourceCourse = $this->getS2B2CFacadeService()->getS2B2CService()->getDistributeContent($courseProduct['s2b2cProductDetailId']);

        if (empty($sourceCourse['status'])) {
            $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
        }
        $sourceCourse = $sourceCourse['data'];
        if ('published' != $sourceCourse['status']) {
            $this->createNewException(CourseException::SOURCE_COURSE_CLOSED());
        }
    }

    /**
     * @param $localCourseSetId
     *
     * @throws \Exception
     *                    检查课程是否有操作权限
     * @codeCoverageIgnore
     */
    public function checkCourseSetStatus($localCourseSetId)
    {
        $this->checkMerchantStatus();
        $s2b2cConfig = $this->getS2B2CFacadeService()->getS2B2CConfig();
        $courseSetProduct = $this->getProductService()->getProductBySupplierIdAndLocalResourceIdAndType($s2b2cConfig['supplierId'], $localCourseSetId, 'course_set');
        $sourceCourseSet = $this->getS2B2CFacadeService()->getS2B2CService()->getDistributeContent($courseSetProduct['s2b2cProductDetailId']);

        if (empty($sourceCourseSet['status'])) {
            $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
        }

        $sourceCourseSet = $sourceCourseSet['data'];
        if ('published' != $sourceCourseSet['status']) {
            $this->createNewException(CourseSetException::SOURCE_COURSE_CLOSED());
        }
    }

    /**
     * @throws \Exception
     * @codeCoverageIgnore
     */
    protected function checkMerchantStatus()
    {
        $merchant = $this->getS2B2CFacadeService()->getMe();
        if (!empty($merchant['error']) || empty($merchant['status'])) {
            $this->createNewException(CourseSetException::SOURCE_COURSE_NOTFOUND());
        }
        if ('cooperation' != $merchant['coop_status']) {
            $this->createNewException(CourseSetException::SOURCE_COURSE_CLOSED());
        }
    }

    /**
     * @return CourseSetService
     */
    protected function getCourseSetService()
    {
        return $this->createService('Course:CourseSetService');
    }

    /**
     * @return CourseService
     */
    protected function getCourseService()
    {
        return $this->createService('Course:CourseService');
    }

    /**
     * @return S2B2CFacadeService
     */
    protected function getS2B2CFacadeService()
    {
        return $this->createService('S2B2C:S2B2CFacadeService');
    }

    /**
     * @return LogService
     */
    protected function getLogService()
    {
        return $this->createService('System:LogService');
    }

    /**
     * @return Logger
     */
    protected function getS2B2CLogger()
    {
        return $this->biz->offsetGet('s2b2c.merchant.logger');
    }

    /**
     * @return ProductService
     */
    protected function getProductService()
    {
        return $this->biz->service('S2B2C:ProductService');
    }

    /**
     * @return SettingService
     */
    protected function getSettingService()
    {
        return $this->createService('System:SettingService');
    }

    /**
     * @return CourseSetDao
     */
    protected function getCourseSetDao()
    {
        return $this->createDao('Course:CourseSetDao');
    }

    /**
     * @return CacheService
     */
    protected function getCacheService()
    {
        return $this->createService('System:CacheService');
    }

    /**
     * @return CourseDao
     *                   不推荐直接调用CourseDao
     */
    protected function getCourseDao()
    {
        return $this->createDao('Course:CourseDao');
    }

    /**
     * @return LessonService
     */
    protected function getCourseLessonService()
    {
        return $this->createService('Course:LessonService');
    }

    /**
     * @return CourseChapterDao
     */
    protected function getCourseChapterDao()
    {
        return $this->createDao('S2B2C:CourseChapterDao');
    }

    /**
     * @return ProductService
     */
    protected function getS2B2CProductService()
    {
        return $this->createService('S2B2C:ProductService');
    }

    /**
     * @return ProductDao
     */
    protected function getS2B2CProductDao()
    {
        return $this->biz->dao('S2B2C:ProductDao');
    }
}

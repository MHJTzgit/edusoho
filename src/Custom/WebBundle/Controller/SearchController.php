<?php
namespace Custom\WebBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Topxia\Common\ArrayToolkit;
use Topxia\Common\Paginator;
use Topxia\WebBundle\Controller\SearchController as BaseSearchController;

class SearchController extends BaseSearchController
{
    public function indexAction(Request $request)
    {
        $courses = $paginator = null;

        $currentUser = $this->getCurrentUser();

        $keywords = $request->query->get('q');
        $keywords = trim($keywords);

        $vip = $this->getAppService()->findInstallApp('Vip');

        $isShowVipSearch = $vip && version_compare($vip['version'], "1.0.7", ">=");

        $currentUserVipLevel = "";
        $vipLevelIds         = "";

        if ($isShowVipSearch) {
            $currentUserVip      = $this->getVipService()->getMemberByUserId($currentUser['id']);
            $currentUserVipLevel = $this->getLevelService()->getLevel($currentUserVip['levelId']);
            $vipLevels           = $this->getLevelService()->findAllLevelsLessThanSeq($currentUserVipLevel['seq']);
            $vipLevelIds         = ArrayToolkit::column($vipLevels, "id");
        }

        $parentId   = 0;
        $categories = $this->getCategoryService()->findAllCategoriesByParentId($parentId);

        $categoryIds = array();

        foreach ($categories as $key => $category) {
            $categoryIds[$key] = $category['name'];
        }

        $categoryId = $request->query->get('categoryIds');
        $fliter     = $request->query->get('fliter');

        $conditions = array(
            'status'     => 'published',
            'title'      => $keywords,
            'categoryId' => $categoryId,
            'parentId'   => 0,
            'table'      => 'singleCourse'
        );

        if ('vip' == $fliter) {
            $conditions['vipLevelIds'] = $vipLevelIds;
        } elseif ('live' == $fliter) {
            $conditions['type'] = 'live';
        } elseif ('free' == $fliter) {
            $conditions['price'] = '0.00';
        }

        $count     = $this->getCourseService()->searchCourseCount($conditions);
        $paginator = new Paginator(
            $this->get('request'),
            $count
            , 12
        );
        $courses = $this->getCourseService()->searchCourses(
            $conditions,
            'latest',
            $paginator->getOffsetCount(),
            $paginator->getPerPageCount()
        );

        return $this->render('TopxiaWebBundle:Search:index.html.twig', array(
            'courses'             => $courses,
            'paginator'           => $paginator,
            'keywords'            => $keywords,
            'isShowVipSearch'     => $isShowVipSearch,
            'currentUserVipLevel' => $currentUserVipLevel,
            'categoryIds'         => $categoryIds,
            'fliter'              => $fliter,
            'count'               => $count
        ));
    }
}

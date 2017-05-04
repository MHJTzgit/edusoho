<?php

namespace ApiBundle\Api\Resource\Activity;

use ApiBundle\Api\Resource\CourseSet\CourseSetFilter;
use ApiBundle\Api\Resource\Filter;

class ActivityFilter extends Filter
{
    protected $publicFields = array(
        'id', 'remark', 'ext', 'mediaType', 'mediaId'
    );

    protected function publicFields(&$data)
    {
        if (!empty($data['ext']) && !empty($data['ext']['replayStatus'])) {
            $data['replayStatus'] = $data['ext']['replayStatus'];
        }

        if (!empty($data['ext']) && !empty($data['ext']['finishType'])) {
            $data['finishType'] = $data['ext']['finishType'];
        }

        if (!empty($data['ext']) && !empty($data['ext']['finishDetail'])) {
            $data['finishDetail'] = $data['ext']['finishDetail'];
        }

        unset($data['ext']);
        unset($data['mediaType']);
    }
}
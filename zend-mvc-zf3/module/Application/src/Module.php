<?php
/**
 * @link      https://github.com/rsystems-8601/zend-express-demo for the canonical source repository
 * @copyright Copyright (c) 2005-2016 RSystems Pvt. Ltd. (http://www.rsystems.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application;

class Module
{
    const VERSION = '3.0.0dev';

    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}

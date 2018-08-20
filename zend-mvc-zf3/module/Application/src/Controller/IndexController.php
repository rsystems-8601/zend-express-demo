<?php
/**
 * @link      https://github.com/rsystems-8601/zend-express-demo for the canonical source repository
 * @copyright Copyright (c) 2005-2016 RSystems Pvt. Ltd. (http://www.rsystems.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
}

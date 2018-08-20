<?php
/**
 * @link      https://github.com/rsystems-8601/zend-express-demo for the canonical source repository
 * @copyright Copyright (c) 2005-2016 RSystems Inc. (http://www.rsystems..com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

/**
 * List of enabled modules for this application.
 *
 * This should be an array of module namespaces used in the application.
 */
return [
    'Zend\Mvc\I18n',
    'Zend\I18n',
    'Zend\InputFilter',
    'Zend\Filter',
    'Zend\Router',
    'Zend\Validator',
    'Zend\Hydrator',
    'Zend\Db', // Db Adapter
    'Zend\Form', // Form Element
    'Application',
    'Blog',
    'Appointment'
];

<?php

use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Expressive\ZendView\HelperPluginManagerFactory;
use Zend\Expressive\ZendView\ZendViewRendererFactory;
use Zend\View\HelperPluginManager;
use Whoops\Handler\PrettyPageHandler;
use Zend\Expressive\Container;
use Zend\Expressive\Middleware\ErrorResponseGenerator;
use Zend\Expressive\Whoops;
use Zend\Expressive\WhoopsPageHandler;

return [
    'dependencies' => [
		'invokables' => [
            WhoopsPageHandler::class => PrettyPageHandler::class,
        ],
        'factories' => [
            TemplateRendererInterface::class => ZendViewRendererFactory::class,
            HelperPluginManager::class => HelperPluginManagerFactory::class,
			//Zend\Expressive\FinalHandler => App\Factory\TemplatedErrorHandlerFactory::class   
        ],
    ],

    'templates' => [
        'layout' => 'layout::default',
		'layout_error' => 'layout/error',
		'map' => [          
            'layout/error'   => 'templates/layout/error.phtml',            
        ]
    ],

    'view_helpers' => [
        // zend-servicemanager-style configuration for adding view helpers:
        // - 'aliases'
        // - 'invokables'
        // - 'factories'
        // - 'abstract_factories'
        // - etc.
    ],
	
	'whoops' => [
        'json_exceptions' => [
            'display'    => true,
            'show_trace' => true,
            'ajax_only'  => true,
        ],
    ],
];

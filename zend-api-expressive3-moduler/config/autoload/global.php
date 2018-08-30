<?php

use Zend\Db\Adapter\AdapterAbstractServiceFactory;
return [
    'service_manager' => [
        'abstract_factories' => [
            AdapterAbstractServiceFactory::class,
        ],
    ],
];
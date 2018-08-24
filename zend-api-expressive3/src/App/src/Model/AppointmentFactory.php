<?php

/*
 * Author : Pradeep Srivastav 
 * Date Created: 08-16-2018
 * Sample Zend Expressive Application for php[architect]
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.  
 */
 
namespace App\Model;

use Interop\Container\ContainerInterface;

/**
 * Generates a Users model
 *
 * @package MyApp\Model
 */
class AppointmentFactory
{
    /**
     * Creates the Users object
     *
     * @param ContainerInterface $container
     * @return Users
     */
    public function __invoke(ContainerInterface $container)
    {
        $dbAdapter = $container->get('Zend\Db\Adapter\Adapter');

        return new Appointment($dbAdapter);
    }
}

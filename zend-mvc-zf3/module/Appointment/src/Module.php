<?php
/**
 * Created by PhpStorm.
 * User: damie
 * Date: 08/16/2018
 * Time: 17:27
 */

namespace Appointment;


class Module
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}
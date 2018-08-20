<?php
/**
 * Created by Pradeep Srivastav (pradeep.srivastav@rsystems.com)
 * Date: 08/16/2018 - Time: 19:46
 */

namespace Appointment\Factory;

use Interop\Container\ContainerInterface;
use Appointment\Model\ZendDbSqlCommand;
use Zend\Db\Adapter\AdapterInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class ZendDbSqlCommandFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new ZendDbSqlCommand($container->get(AdapterInterface::class));
    }
}
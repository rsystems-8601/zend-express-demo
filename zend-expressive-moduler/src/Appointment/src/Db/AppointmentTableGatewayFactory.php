<?php

namespace Appointment\Db;

use Appointment\Model\Entity\AppointmentEntity;
use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;

class AppointmentTableGatewayFactory
{
    /**
     * @param ContainerInterface $container
     * @return AppointmentTableGateway
     */
    public function __invoke(ContainerInterface $container)
    {
        $resultSetPrototype = new HydratingResultSet(
            null,
            new AppointmentEntity()
        );

        return new AppointmentTableGateway(
            $container->get(AdapterInterface::class),
            $resultSetPrototype
        );
    }
}

<?php

namespace Appointment\Model\Repository;

use Appointment\Model\Storage\AppointmentStorageInterface;
use Interop\Container\ContainerInterface;

class AppointmentRepositoryFactory
{
    /**
     * @param ContainerInterface $container
     * @return AppointmentRepository
     */
    public function __invoke(ContainerInterface $container)
    {
        return new AppointmentRepository(
            $container->get(AppointmentStorageInterface::class)
        );
    }
}

<?php

namespace Appointment\Action;

use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Expressive\Router\RouterInterface;

class AppointmentDeleteHandleActionFactory implements FactoryInterface
{
    /**
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param null|array $options
     * @return AppointmentDeleteHandleAction
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new AppointmentDeleteHandleAction(
            $container->get(RouterInterface::class),
            $container->get(AppointmentRepositoryInterface::class)
        );
    }
}

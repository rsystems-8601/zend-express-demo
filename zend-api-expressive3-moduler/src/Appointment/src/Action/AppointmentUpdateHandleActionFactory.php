<?php

namespace Appointment\Action;

use Appointment\Form\AppointmentDataForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Expressive\Router\RouterInterface;

class AppointmentUpdateHandleActionFactory implements FactoryInterface
{
    /**
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param null|array $options
     * @return AppointmentUpdateHandleAction
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new AppointmentUpdateHandleAction(
            $container->get(RouterInterface::class),
            $container->get(AppointmentRepositoryInterface::class),
            $container->get(AppointmentDataForm::class)
        );
    }
}

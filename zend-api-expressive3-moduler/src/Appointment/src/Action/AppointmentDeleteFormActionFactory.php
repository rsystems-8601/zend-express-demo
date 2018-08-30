<?php

namespace Appointment\Action;

use Appointment\Form\AppointmentDeleteForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Container\ContainerInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * Class AppointmentDeleteFormActionFactory
 *
 * @package Appointment\Action
 */
class AppointmentDeleteFormActionFactory implements FactoryInterface
{
    /**
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param null|array $options
     * @return AppointmentDeleteFormAction
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new AppointmentDeleteFormAction(
            $container->get(TemplateRendererInterface::class),
            $container->get(AppointmentRepositoryInterface::class),
            $container->get(AppointmentDeleteForm::class)
        );
    }
}

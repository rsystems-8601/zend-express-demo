<?php

namespace Appointment\Action;

use Appointment\Form\AppointmentDataForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Container\ContainerInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

/**
 * Class AppointmentUpdateFormActionFactory
 *
 * @package Appointment\Action
 */
class AppointmentUpdateFormActionFactory implements FactoryInterface
{
    /**
     * @param ContainerInterface $container
     * @param string $requestedName
     * @param null|array $options
     * @return AppointmentUpdateFormAction
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        return new AppointmentUpdateFormAction(
            $container->get(TemplateRendererInterface::class),
            $container->get(AppointmentRepositoryInterface::class),
            $container->get(AppointmentDataForm::class)
        );
    }
}

<?php
namespace Appointment\Action;

use Interop\Container\ContainerInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Appointment\Form\AppointmentDataForm;

/**
 * Class AppointmentCreateFormActionFactory
 *
 * @package Appointment\Action
 */
class AppointmentCreateFormActionFactory
{
    /**
     * @param ContainerInterface $container
     *
     * @return AppointmentCreateFormAction
     */
    public function __invoke(ContainerInterface $container)
    {
        $template  = $container->get(TemplateRendererInterface::class);
        $appointmentForm = $container->get(AppointmentDataForm::class);

        return new AppointmentCreateFormAction($template, $appointmentForm);
    }
}

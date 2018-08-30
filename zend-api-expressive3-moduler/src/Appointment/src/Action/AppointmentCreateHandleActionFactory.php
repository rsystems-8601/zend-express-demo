<?php
namespace Appointment\Action;

use Interop\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Appointment\Form\AppointmentDataForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;

/**
 * Class AppointmentCreateHandleActionFactory
 *
 * @package Appointment\Action
 */
class AppointmentCreateHandleActionFactory
{
    /**
     * @param ContainerInterface $container
     *
     * @return AppointmentCreateHandleAction
     */
    public function __invoke(ContainerInterface $container)
    {
        $router          = $container->get(RouterInterface::class);
        $appointmentRepository = $container->get(AppointmentRepositoryInterface::class);
        $appointmentForm       = $container->get(AppointmentDataForm::class);

        return new AppointmentCreateHandleAction($router, $appointmentRepository, $appointmentForm);
    }
}

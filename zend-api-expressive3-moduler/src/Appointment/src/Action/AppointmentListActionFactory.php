<?php

namespace Appointment\Action;

use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Container\ContainerInterface;
use Zend\Expressive\Template\TemplateRendererInterface;

class AppointmentListActionFactory
{
    /**
     * @param ContainerInterface $container
     * @return AppointmentListAction
     */
    public function __invoke(ContainerInterface $container)
    {
        return new AppointmentListAction(
            $container->get(TemplateRendererInterface::class),
            $container->get(AppointmentRepositoryInterface::class)
        );
    }
}

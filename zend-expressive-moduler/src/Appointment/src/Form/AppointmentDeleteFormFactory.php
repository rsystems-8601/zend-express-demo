<?php
namespace Appointment\Form;

use Interop\Container\ContainerInterface;
use Zend\Form\Form;

/**
 * Class AppointmentDeleteFormFactory
 *
 * @package Appointment\Form
 */
class AppointmentDeleteFormFactory extends Form
{
    /**
     * @param ContainerInterface $container
     *
     * @return AppointmentDeleteForm
     */
    public function __invoke(ContainerInterface $container)
    {
        $form = new AppointmentDeleteForm();
        $form->init();

        return $form;
    }
}

<?php
namespace Appointment\Form;

use Interop\Container\ContainerInterface;
use Zend\Form\Form;
use Appointment\Model\InputFilter\AppointmentInputFilter;

/**
 * Class AppointmentDataFormFactory
 *
 * @package Appointment\Form
 */
class AppointmentDataFormFactory extends Form
{
    /**
     * @param ContainerInterface $container
     *
     * @return AppointmentDataForm
     */
    public function __invoke(ContainerInterface $container)
    {
        $inputFilter = $container->get(AppointmentInputFilter::class);

        $form = new AppointmentDataForm();
        $form->setInputFilter($inputFilter);
        $form->init();

        return $form;
    }
}

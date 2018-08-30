<?php
namespace Appointment\Model\InputFilter;

use Interop\Container\ContainerInterface;

/**
 * Class AppointmentInputFilterFactory
 *
 * @package Appointment\Model\InputFilter
 */
class AppointmentInputFilterFactory
{
    /**
     * @param ContainerInterface $container
     *
     * @return AppointmentInputFilter
     */
    public function __invoke(ContainerInterface $container)
    {
        $inputFilter = new AppointmentInputFilter();
        $inputFilter->init();

        return $inputFilter;
    }
}

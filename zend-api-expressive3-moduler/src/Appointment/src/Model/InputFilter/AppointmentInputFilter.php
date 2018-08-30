<?php
namespace Appointment\Model\InputFilter;

use Zend\InputFilter\InputFilter;

/**
 * Class AppointmentInputFilter
 *
 * @package Appointment\Model\InputFilter
 */
class AppointmentInputFilter extends InputFilter
{
    /**
     * Init input filter
     */
    public function init()
    {
        $this->add([
            'name'     => 'artist',
            'required' => true,
            'filters'  => [
                ['name' => 'StripTags'],
                ['name' => 'StringTrim'],
            ],
            'validators' => [
                [
                    'name'    => 'StringLength',
                    'options' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
            ],
        ]);

        $this->add([
            'name'     => 'title',
            'required' => true,
            'filters'  => [
                ['name' => 'StripTags'],
                ['name' => 'StringTrim'],
            ],
            'validators' => [
                [
                    'name'    => 'StringLength',
                    'options' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
            ],
        ]);
    }
}

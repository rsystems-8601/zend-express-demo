<?php
namespace Appointment\Form;

use Zend\Form\Form;

/**
 * Class AppointmentDataForm
 *
 * @package Appointment\Form
 */
class AppointmentDataForm extends Form
{
    /**
     * Init form
     */
    public function init()
    {
        $this->setName('appointment_form');
        $this->setAttribute('class', 'form-horizontal');

        $this->add(
            [
                'name'       => 'artist',
                'type'       => 'Text',
                'attributes' => [
                    'class' => 'form-control',
                ],
                'options'    => [
                    'label'            => 'Artist',
                    'label_attributes' => [
                        'class' => 'col-sm-2 control-label',
                    ],
                ],
            ]
        );

        $this->add(
            [
                'name'       => 'title',
                'type'       => 'Text',
                'attributes' => [
                    'class' => 'form-control',
                ],
                'options'    => [
                    'label' => 'Title',
                    'label_attributes' => [
                        'class' => 'col-sm-2 control-label',
                    ],
                ],
            ]
        );

        $this->add(
            [
                'name'       => 'save_appointment',
                'type'       => 'Submit',
                'attributes' => [
                    'class' => 'btn btn-primary',
                    'value' => 'Save Appointment',
                    'id'    => 'save_appointment',
                ],
            ]
        );
    }
}

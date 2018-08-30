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
                'name'       => 'reason',
                'type'       => 'Text',
                'attributes' => [
                    'class' => 'form-control',
                ],
                'options'    => [
                    'label'            => 'Reason',
                    'label_attributes' => [
                        'class' => 'col-sm-2 control-label',
                    ],
                ],
            ]
        );

        $this->add(
            [
                'name'       => 'username',
                'type'       => 'Text',
                'attributes' => [
                    'class' => 'form-control',
                ],
                'options'    => [
                    'label' => 'Username',
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

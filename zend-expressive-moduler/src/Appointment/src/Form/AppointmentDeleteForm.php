<?php

namespace Appointment\Form;

use Zend\Form\Form;

/**
 * Class AppointmentDeleteForm
 *
 * @package Appointment\Form
 */
class AppointmentDeleteForm extends Form
{
    /**
     * Init form
     */
    public function init()
    {
        $this->setName('appointment_delete_form');
        $this->setAttribute('class', 'form-horizontal');

        $this->add(
            [
                'name'       => 'delete_appointment_yes',
                'type'       => 'Submit',
                'attributes' => [
                    'class' => 'btn btn-danger',
                    'value' => 'Yes',
                    'id'    => 'delete_appointment_yes',
                ],
            ]
        );

        $this->add(
            [
                'name'       => 'delete_appointment_no',
                'type'       => 'Submit',
                'attributes' => [
                    'class' => 'btn btn-default',
                    'value' => 'No',
                    'id'    => 'delete_appointment_no',
                ],
            ]
        );
    }
}

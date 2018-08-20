<?php
/**
 * Created by Pradeep Srivastav (pradeep.srivastav@rsystems.com)
 * Date: 08/16/2018 - Time: 19:24
 */

namespace Appointment\Form;

use Appointment\Model\Post;
use Zend\Hydrator\Reflection as ReflectionHydrator;
use Zend\Form\Fieldset;

class PostFieldset extends Fieldset
{

    public function init()
    {
        $this->setHydrator(new ReflectionHydrator());
        $this->setObject(new Post('', ''));
        
        $this->add([
            'type' => 'hidden',
            'name' => 'id',
        ]);

        $this->add([
            'type' => 'text',
            'name' => 'username',
            'options' => [
                'label' => 'User Name',
            ],
        ]);
		
		$this->add([
            'type' => 'date',
            'name' => 'bookingdate',
            'options' => [
                'label' => 'Booking Date',
            ],
        ]);

        $this->add([
            'type' => 'textarea',
            'name' => 'reason',
            'options' => [
                'label' => 'Reason',
            ],
        ]);
		
		
    }
}
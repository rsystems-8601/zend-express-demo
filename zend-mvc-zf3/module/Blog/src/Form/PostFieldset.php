<?php
/**
 * Created by Pradeep Srivastav (pradeep.srivastav@rsystems.com)
 * Date: 08/16/2018 - Time: 19:24
 */

namespace Blog\Form;

use Blog\Model\Post;
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
            'name' => 'title',
            'options' => [
                'label' => 'Post Title',
            ],
        ]);

        $this->add([
            'type' => 'textarea',
            'name' => 'text',
            'options' => [
                'label' => 'Post Text',
            ],
        ]);
    }
}
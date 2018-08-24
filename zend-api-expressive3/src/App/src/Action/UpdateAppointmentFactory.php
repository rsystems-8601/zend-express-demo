<?php
/*
* Author : Pradeep Srivastav 
* Date Created: 08-16-2018
*/

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class UpdateAppointmentFactory
{
	/*
	* Function __invoke
	* Purpose: Recieves update appointment request
	* @params : appointment id
	* @returns : bool status
	*/
    public function __invoke(ContainerInterface $container)
    {		
		$con = $container->get(AdapterInterface::class);	
		$model= new \App\Model\Appointment($con);
		$updateStatus = $model->updateAppointment();
		
        $router   = $container->get(RouterInterface::class);
		
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;
		$template->setQueryResponse= $updateStatus;
        return new UpdateAppointmentAction($router, $template);
    }
}

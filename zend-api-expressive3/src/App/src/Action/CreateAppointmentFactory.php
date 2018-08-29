<?php
/*
	* Author : Anil Sharma -Rsystems
	* Date Created: 16-08-2018
*/

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;
use App\Model\Appointment;

class CreateAppointmentFactory
{
	/*
	* Function __invoke
	* Purpose: Recieves book appointment request	* 
	* @params : username, appointment date, appointment reason
	* @returns : bool status
	*/
    public function __invoke(ContainerInterface $container)
    {
		$con = $container->get(AdapterInterface::class);	
		$model= new Appointment($con);
		$updateStatus = $model->createAppointment();
		
		$router   = $container->get(RouterInterface::class);

		$template = $container->has(TemplateRendererInterface::class)
			? $container->get(TemplateRendererInterface::class)
			: null;
		$template->setQueryResponse= $updateStatus;
		return new CreateAppointmentAction($router, $template);
    }
}

<?php
/*
* Author : Anil Sharma 
* Date Created: 16-08-2018
*/

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;
use App\Model\Appointment;

class DeleteAppointmentFactory
{
	/*
	* Function __invoke
	* Purpose: recieves cancel (delete) appointment request
	* @params : appointment id
	* @returns : bool status
	*/
    public function __invoke(ContainerInterface $container)
    {
		$con = $container->get(AdapterInterface::class);	
		$model= new Appointment($con);
		$updateStatus = $model->deleteAppointment();

		$router   = $container->get(RouterInterface::class);

		$template = $container->has(TemplateRendererInterface::class)
			? $container->get(TemplateRendererInterface::class)
			: null;
		$template->setQueryResponse= $updateStatus;
		return new DeleteAppointmentAction($router, $template);
    }
}

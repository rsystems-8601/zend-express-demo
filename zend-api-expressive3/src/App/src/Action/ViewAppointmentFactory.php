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
use App\Model\Appointment;

class ViewAppointmentFactory
{
	/*
	* Function __invoke
	* Purpose: Recieves view appointment request
	* @returns : string appointments string
	*/
    public function __invoke(ContainerInterface $container)
    {
		
		$con = $container->get(AdapterInterface::class);			

		$model= new Appointment($con);
		$rows = $model->getAppointment();

		$router   = $container->get(RouterInterface::class);

		$template = $container->has(TemplateRendererInterface::class)
			? $container->get(TemplateRendererInterface::class)
			: null;
		$template->setQueryResponse= $rows;

		return new ViewAppointmentAction($router, $template);
    }
	
}

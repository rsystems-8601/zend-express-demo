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
		$appointment_id = $this->getParam('id');		
		$where='';
		$updateStatus= false;
		if($appointment_id  && is_numeric($appointment_id)){			
			try{
				$stmt = $con->query("UPDATE `Appointments` SET `is_deleted` =1 WHERE `id` =?");
				$stmt->execute(array($appointment_id));
				$updateStatus= true;
			}catch(Exception $e){
				// Exception to be handled here
			}
		}
		
        $router   = $container->get(RouterInterface::class);
		
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;
		$template->setQueryResponse= $updateStatus;
        return new DeleteAppointmentAction($router, $template);
    }
	
	function getParam($key){
		return isset($_POST[$key])? $_POST[$key]:false;
	}
}

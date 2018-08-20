<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class DeleteAppointmentFactory
{
	/*
	* Function __invoke
	* recieves cancel (delete) appointment request
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
				$stmt = $con->query("UPDATE `Appointments` SET `is_deleted` =1 WHERE `id` =$appointment_id");
				$result = $stmt->execute();
				$updateStatus= true;
			}catch(Exception $e){
				// Exception to be handled here
			}
		}
		
        $router   = $container->get(RouterInterface::class);
		$router->setQueryResponse= $updateStatus;
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;

        return new DeleteAppointmentAction($router, $template);
    }
	
	function getParam($key){
		return isset($_POST[$key])? $_POST[$key]:false;
	}
}

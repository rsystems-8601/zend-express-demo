<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class UpdateAppointmentFactory
{
	/*
	* Function __invoke
	* Recieves update appointment request
	* @params : appointment id
	* @returns : bool status
	*/
    public function __invoke(ContainerInterface $container)
    {		
		$con = $container->get(AdapterInterface::class);	
		$appointment_id = $this->getParam('appointment_id');		
		$where='';
		$updateStatus= false;
		if($appointment_id  && is_numeric($appointment_id)){			
			$username = $this->getParam('full_name');
			$reason = $this->getParam('appointment_reason');
			$booking_date = $this->getParam('appointment_time');	
			try{
				$stmt = $con->query("UPDATE `Appointments` SET `username` = '$username', `reason` = '$reason', `booking_date` = '$booking_date' WHERE `id` = $appointment_id");
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

        return new UpdateAppointmentAction($router, $template);
    }
	
	function getParam($key){
		return isset($_POST[$key])? $_POST[$key]:false;
	}
}

<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class UpdateAppointmentFactory
{
    public function __invoke(ContainerInterface $container)
    {		
		$con = $container->get(AdapterInterface::class);	
		$appointment_id = isset($_GET['appointment_id'])? $_GET['appointment_id']:false;		
		$where='';
		$updateStatus= false;
		if($appointment_id  && is_numeric($appointment_id)){
			$id = (int)$_GET['appointment_id'];
			$username = $_GET['full_name'];
			$reason = $_GET['appointment_reason'];
			$booking_date = $_GET['appointment_time'];	
			try{
				$stmt = $con->query("UPDATE `Appointments` SET `username` = '$username', `reason` = '$reason', `booking_date` = '$booking_date' WHERE `id` = $id");
				$result = $stmt->execute();
				$updateStatus= true;
			}catch(Exception $e){
				print_r($e->getMessage());
				die;
			}
		}
		
        $router   = $container->get(RouterInterface::class);
		$router->setQueryResponse= $updateStatus;
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;

        return new UpdateAppointmentAction($router, $template);
    }
}

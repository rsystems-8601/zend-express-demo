<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class CreateAppointmentFactory
{
    public function __invoke(ContainerInterface $container)
    {
		$con = $container->get(AdapterInterface::class);	
		$username = isset($_GET['full_name'])? $_GET['full_name']:false;		
		$where='';
		$updateStatus= false;
		if($username  && $username!=''){						
			$reason = $_GET['appointment_reason'];
			$booking_date = $_GET['appointment_time'];	
			try{
				$stmt = $con->query("INSERT INTO `Appointments` ( `username`, `reason`, `booking_date`) VALUES ('$username', '$reason', '$booking_date')");
				$result = $stmt->execute();
				$updateStatus= true;
			}catch(Exception $e){
				print_r($e->getMessage());
				die(56465465);
			}
		}
		
        $router   = $container->get(RouterInterface::class);
		$router->setQueryResponse= $updateStatus;
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;

        return new CreateAppointmentAction($router, $template);
    }
}

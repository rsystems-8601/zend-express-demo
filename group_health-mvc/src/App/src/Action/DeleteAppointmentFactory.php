<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class DeleteAppointmentFactory
{
    public function __invoke(ContainerInterface $container)
    {
		$con = $container->get(AdapterInterface::class);	
		$appointment_id = isset($_GET['id'])? $_GET['id']:false;		
		$where='';
		$updateStatus= false;
		if($appointment_id  && is_numeric($appointment_id)){
			$id = (int)$_GET['id'];
			try{
				$stmt = $con->query("UPDATE `Appointments` SET `is_deleted` =1 WHERE `id` =$id");
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

        return new DeleteAppointmentAction($router, $template);
    }
}

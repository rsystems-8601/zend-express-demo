<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class ViewAppointmentFactory
{
    public function __invoke(ContainerInterface $container)
    {
		
		$con = $container->get(AdapterInterface::class);	
		$userId = isset($_GET['id'])? $_GET['id']:false;		
		$where='';
		if($userId  && is_numeric($userId)){
			$where = " and id=$userId ";
		}
		$stmt = $con->query('SELECT * FROM `Appointments` where is_deleted!=1 '.$where);
		$result = $stmt->execute();
		$result->getResource()->setFetchMode(\PDO::FETCH_ASSOC);
		$rows = $result->getResource()->fetchAll();
		// echo '<pre>';
		// print_r($rows);
		// print_r(get_class_methods($con)); 
		// print_r(get_class_methods($result->getResource())); 
		// die;
		
        $router   = $container->get(RouterInterface::class);
		$router->setQueryResponse= $rows;
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;

        return new ViewAppointmentAction($router, $template);
    }
}

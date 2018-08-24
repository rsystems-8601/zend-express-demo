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
		$appointment_id = $this->getParam('id');		
		$where='';
		if($appointment_id  && is_numeric($appointment_id)){
			$where = " and id=? ";
		}
		$stmt = $con->query("SELECT id, username, reason, DATE_FORMAT(booking_date,'%Y-%m-%d %h:%i') as booking_date, DATE_FORMAT(end_time,'%Y-%m-%d %h:%i') as end_time, is_deleted FROM `Appointments` where is_deleted!=1 ".$where);
		if($appointment_id  && is_numeric($appointment_id)){			
			$result = $stmt->execute(array($appointment_id));
		}else{
			$result = $stmt->execute();
		}
		
		$result->getResource()->setFetchMode(\PDO::FETCH_ASSOC);
		$rows = $result->getResource()->fetchAll();
		
        $router   = $container->get(RouterInterface::class);
		$router->setQueryResponse= $rows;
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;
		$template->setQueryResponse= $rows;
		
        return new ViewAppointmentAction($router, $template);
    }
	
	function getParam($key){
		return isset($_GET[$key])? $_GET[$key]:false;
	}
}

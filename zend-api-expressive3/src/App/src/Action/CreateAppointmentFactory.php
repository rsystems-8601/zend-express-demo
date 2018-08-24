<?php
/*
	* Author : Anil Sharma -Rsystems
	* Date Created: 16-08-2018
*/

namespace App\Action;

use Psr\Container\ContainerInterface;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;
use Zend\Db\Adapter\AdapterInterface;

class CreateAppointmentFactory
{
	/*
	* Function __invoke
	* Purpose: Recieves book appointment request	* 
	* @params : username, appointment date, appointment reason
	* @returns : bool status
	*/
    public function __invoke(ContainerInterface $container)
    {
		$con = $container->get(AdapterInterface::class);	
		$username = $this->getParam('full_name');		
		$where='';
		$updateStatus= false;
		if($username  && $username!=''){						
			$reason = $this->getParam('appointment_reason');
			$booking_date = $this->getParam('appointment_time');	
			$endTime = date("Y-m-d H:i",strtotime($booking_date)+900);
			try{
				$stmt = $con->query("INSERT INTO `Appointments` ( `username`, `reason`, `booking_date`,`end_time`) VALUES (?,?,?,?)");
				$stmt->execute(array($username, $reason, $booking_date,$endTime));
				$updateStatus= true;
			}catch(Exception $e){
				// Exception to be handled here		
			}
		}
		
        $router   = $container->get(RouterInterface::class);
		
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;
		$template->setQueryResponse= $rows;
        return new CreateAppointmentAction($router, $template);
    }
	
	function getParam($key){
		return isset($_POST[$key])? $_POST[$key]:false;
	}
}

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
			$where = " and id=$appointment_id ";
		}
		$stmt = $con->query('SELECT * FROM `Appointments` where is_deleted!=1 '.$where);
		$result = $stmt->execute();
		$result->getResource()->setFetchMode(\PDO::FETCH_ASSOC);
		$rows = $result->getResource()->fetchAll();
		
        $router   = $container->get(RouterInterface::class);
		$router->setQueryResponse= $rows;
        $template = $container->has(TemplateRendererInterface::class)
            ? $container->get(TemplateRendererInterface::class)
            : null;

        return new ViewAppointmentAction($router, $template);
    }
	
	function getParam($key){
		return isset($_GET[$key])? $_GET[$key]:false;
	}
}

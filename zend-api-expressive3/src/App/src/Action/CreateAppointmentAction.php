<?php
/*
* Author : Anil Sharma 
* Date Created: 16-08-2018
*/	

namespace App\Action;

use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\JsonResponse;
use Zend\Expressive\Router;
use Zend\Expressive\Template;
use Zend\Expressive\Plates\PlatesRenderer;
use Zend\Expressive\Twig\TwigRenderer;
use Zend\Expressive\ZendView\ZendViewRenderer;

/*
* API class CreateAppointmentAction
* handle request to create new appointment
*/	

class CreateAppointmentAction implements ServerMiddlewareInterface
{
    private $router;

    private $template;

    public function __construct(Router\RouterInterface $router, Template\TemplateRendererInterface $template = null)
    {
        $this->router   = $router;
        $this->template = false; //$template;
    }
	
	/*
	* Function Process
	* Purpose : New appointment confirmation response
	* @params : username, appointment date, reason
	* @returns : bool status
	*/

    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        if (! $this->template) {
            return new JsonResponse([
                'status' => true,
                'result' => $this->router->setQueryResponse,
            ]);
        }

        $data = [];
		$data['siteName']= 'GroupHEALTH';        

        return new HtmlResponse($this->template->render('app::save-doctor', $data));
    }
}

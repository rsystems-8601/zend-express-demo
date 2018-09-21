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

class DeleteAppointmentAction implements ServerMiddlewareInterface
{
    private $router;

    private $template;

    public function __construct(Router\RouterInterface $router, Template\TemplateRendererInterface $template = null)
    {
        $this->router   = $router;
        $this->template = $template;
    }

	/*
	* Function process
	* Returns cancel (delete) appointment response
	* @params : int appointment id
	* @returns : bool status
	*/
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        if ( $this->template) {
			header('Access-Control-Allow-Origin: *');
            return new JsonResponse([
                'status' => true,
                'result' => $this->template->setQueryResponse,
            ]);
        }       
    }
}

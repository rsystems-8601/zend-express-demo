<?php
/*
* Author : Pradeep Srivastav 
* Date Created: 08-16-2018
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

class ViewAppointmentAction implements ServerMiddlewareInterface
{
    private $router;

    private $template;

    public function __construct(Router\RouterInterface $router, Template\TemplateRendererInterface $template = null)
    {
        $this->router   = $router;
        $this->template = false;
    }

	/*
	* Function process
	* Purpose: Returns list of appointments response
	* @returns : string json
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

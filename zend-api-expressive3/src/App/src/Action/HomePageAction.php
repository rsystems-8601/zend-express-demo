<?php

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

class HomePageAction implements ServerMiddlewareInterface
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
	* Returns view appointments response
	* Manage navigation of all the actions (template part)
	* @params : $request, $delegate
	* @returns : string appointments json string
	*/
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $data = [];
		$data['siteName']= 'GroupHEALTH';        

        return new HtmlResponse($this->template->render('app::home-page', $data));
    }
}

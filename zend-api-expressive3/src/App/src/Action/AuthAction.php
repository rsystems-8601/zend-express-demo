<?php

namespace App\Action;

use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\JsonResponse;
use Zend\Expressive\Router;
use Zend\Expressive\Template;
use Zend\Expressive\Plates\PlatesRenderer;
use Zend\Expressive\Twig\TwigRenderer;
use Zend\Expressive\ZendView\ZendViewRenderer;

use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface;
use Psr\Http\Message\ServerRequestInterface;

class AuthAction implements MiddlewareInterface
{   
	private $router;
	private $request;
	
	//test middleware
    //public function __construct(ServerRequestInterface $request)
    public function __construct()
    {
		return true;
		//$this->request = 4;
        //die('sasasasaas'.$this->request);
    }
	
	
	 public function process(ServerRequestInterface $request, DelegateInterface $delegate)
     {
		return true;
		//$this->request = 4;
		//die('sasasasaas'.$this->request);
		// //print_r( get_class_methods($request));
		// //echo $request->getAttribute('name');
		// // echo $uri  = $request->getUri();  --working
		// // echo $path = $uri->getPath();  --working
		// // die;   --working
        // $data = [];
		// $data['siteName']= 'GroupHEALTH';    
        // return new HtmlResponse($this->template->render('app::home-page', $data));
     }
	
	
}

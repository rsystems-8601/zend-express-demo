<?php
/**
 * Setup routes with a single request method:
 *
 * $app->get('/', App\Action\HomePageAction::class, 'home');
 * $app->post('/album', App\Action\AlbumCreateAction::class, 'album.create');
 * $app->put('/album/:id', App\Action\AlbumUpdateAction::class, 'album.put');
 * $app->patch('/album/:id', App\Action\AlbumUpdateAction::class, 'album.patch');
 * $app->delete('/album/:id', App\Action\AlbumDeleteAction::class, 'album.delete');
 *
 * Or with multiple request methods:
 *
 * $app->route('/contact', App\Action\ContactAction::class, ['GET', 'POST', ...], 'contact');
 *
 * Or handling all request methods:
 *
 * $app->route('/contact', App\Action\ContactAction::class)->setName('contact');
 *
 * or:
 *
 * $app->route(
 *     '/contact',
 *     App\Action\ContactAction::class,
 *     Zend\Expressive\Router\Route::HTTP_METHOD_ANY,
 *     'contact'
 * );
 */

/** @var \Zend\Expressive\Application $app */

//test middleware for home only
/*
function middleware($action)
    {	    
		return 'home';	        
    }

$app->get('/', App\Action\HomePageAction::class, middleware('home') );
*/


$app->get('/', App\Action\HomePageAction::class,'home' );
$app->post('/createappointment', App\Action\CreateAppointmentAction::class, 'createappointment');
$app->route('/viewappointment', App\Action\ViewAppointmentAction::class, ['get', 'post'], 'viewappointment');
$app->post('/updateappointment', App\Action\UpdateAppointmentAction::class, 'updateappointment');
$app->post('/deleteappointment', App\Action\DeleteAppointmentAction::class, 'deleteappointment');
$app->get('/api/ping', App\Action\PingAction::class, 'api.ping');


// use Psr\Container\ContainerInterface;
// use Zend\Expressive\Application;
// use Zend\Expressive\MiddlewareFactory;

// return function (Application $app, MiddlewareFactory $factory, ContainerInterface $container) : void {
    // $app->get('/books', \App\Handler\ListBooksHandler::class, 'books');
// };

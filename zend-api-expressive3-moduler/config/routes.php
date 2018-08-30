<?php
/**
 * Setup routes with a single request method:
 *
 * $app->get('/', App\Action\HomePageAction::class, 'home');
 * $app->post('/appointment', App\Action\AppointmentCreateAction::class, 'appointment.create');
 * $app->put('/appointment/:id', App\Action\AppointmentUpdateAction::class, 'appointment.put');
 * $app->patch('/appointment/:id', App\Action\AppointmentUpdateAction::class, 'appointment.patch');
 * $app->delete('/appointment/:id', App\Action\AppointmentDeleteAction::class, 'appointment.delete');
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

$app->get('/', App\Action\HomePageAction::class, 'home');
$app->get('/api/ping', App\Action\PingAction::class, 'api.ping');


$app->get('/appointment', Appointment\Action\AppointmentListAction::class, 'appointment');
$app->get('/appointment/create', Appointment\Action\AppointmentCreateFormAction::class, 'appointment-create');
$app->post('/appointment/create/handle',[
    Appointment\Action\AppointmentCreateHandleAction::class,
    Appointment\Action\AppointmentCreateFormAction::class,
], 'appointment-create-handle');
$app->get("/appointment/update/{id:\d+}", [
    Appointment\Action\AppointmentUpdateFormAction::class,
], 'appointment-update');
$app->post("/appointment/update/{id:\d+}/handle", [
    Appointment\Action\AppointmentUpdateHandleAction::class,
    Appointment\Action\AppointmentUpdateFormAction::class,
], 'appointment-update-handle');
$app->get("/appointment/delete/{id:\d+}", [
    Appointment\Action\AppointmentDeleteFormAction::class,
], 'appointment-delete');
$app->post("/appointment/delete/{id:\d+}/handle", [
    Appointment\Action\AppointmentDeleteHandleAction::class,
    Appointment\Action\AppointmentDeleteFormAction::class,
], 'appointment-delete-handle');


$app->get('/album', Album\Action\AlbumListAction::class, 'album');
$app->get('/album/create', Album\Action\AlbumCreateFormAction::class, 'album-create');
$app->post('/album/create/handle',[
    Album\Action\AlbumCreateHandleAction::class,
    Album\Action\AlbumCreateFormAction::class,
], 'album-create-handle');
$app->get("/album/update/{id:\d+}", [
    Album\Action\AlbumUpdateFormAction::class,
], 'album-update');
$app->post("/album/update/{id:\d+}/handle", [
    Album\Action\AlbumUpdateHandleAction::class,
    Album\Action\AlbumUpdateFormAction::class,
], 'album-update-handle');
$app->get("/album/delete/{id:\d+}", [
    Album\Action\AlbumDeleteFormAction::class,
], 'album-delete');
$app->post("/album/delete/{id:\d+}/handle", [
    Album\Action\AlbumDeleteHandleAction::class,
    Album\Action\AlbumDeleteFormAction::class,
], 'album-delete-handle');

<?php

namespace Appointment\Action;

use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Expressive\Router\RouterInterface;
use Appointment\Model\Repository\AppointmentRepositoryInterface;

/**
 * Class AppointmentDeleteHandleAction
 *
 * @package Appointment\Action
 */
class AppointmentDeleteHandleAction implements ServerMiddlewareInterface
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var AppointmentRepositoryInterface
     */
    private $appointmentRepository;


    /**
     * AppointmentDeleteHandleAction constructor.
     *
     * @param RouterInterface          $router
     * @param AppointmentRepositoryInterface $appointmentRepository
     */
    public function __construct(
        RouterInterface $router,
        AppointmentRepositoryInterface $appointmentRepository
    ) {
        $this->router          = $router;
        $this->appointmentRepository = $appointmentRepository;
    }

    /**
     * {@inheritDoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $id = $request->getAttribute('id');

        $appointment = $this->appointmentRepository->fetchSingleAppointment($id);

        $postData = $request->getParsedBody();

        if (isset($postData['delete_appointment_yes'])) {
            $this->appointmentRepository->deleteAppointment($appointment);
        }

        return new RedirectResponse(
            $this->router->generateUri('appointment')
        );
    }
}

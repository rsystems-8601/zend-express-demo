<?php

namespace Appointment\Action;

use Appointment\Form\AppointmentDataForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Expressive\Router\RouterInterface;

/**
 * Class AppointmentUpdateHandleAction
 *
 * @package Appointment\Action
 */
class AppointmentUpdateHandleAction implements ServerMiddlewareInterface
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
     * @var AppointmentDataForm
     */
    private $appointmentForm;

    /**
     * AppointmentUpdateHandleAction constructor.
     *
     * @param RouterInterface          $router
     * @param AppointmentRepositoryInterface $appointmentRepository
     * @param AppointmentDataForm            $appointmentForm
     */
    public function __construct(
        RouterInterface $router,
        AppointmentRepositoryInterface $appointmentRepository,
        AppointmentDataForm $appointmentForm
    ) {
        $this->router          = $router;
        $this->appointmentRepository = $appointmentRepository;
        $this->appointmentForm       = $appointmentForm;
    }

    /**
     * {@inheritdoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $id = $request->getAttribute('id');

        $postData = $request->getParsedBody();

        $this->appointmentForm->setData($postData);

        if ($this->appointmentForm->isValid()) {
            $postData['id'] = $id;

            $appointment = $this->appointmentRepository->fetchSingleAppointment($id);
            $appointment->exchangeArray($postData);

            $this->appointmentRepository->saveAppointment($appointment);

            return new RedirectResponse(
                $this->router->generateUri('appointment')
            );
        }

        return $delegate->process($request);
    }
}

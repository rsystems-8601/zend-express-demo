<?php

namespace Appointment\Action;

use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Expressive\Template\TemplateRendererInterface;
use Appointment\Form\AppointmentDeleteForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;

/**
 * Class AppointmentDeleteFormAction
 *
 * @package Appointment\Action
 */
class AppointmentDeleteFormAction implements ServerMiddlewareInterface
{
    /**
     * @var TemplateRendererInterface
     */
    private $template;

    /**
     * @var AppointmentRepositoryInterface
     */
    private $appointmentRepository;

    /**
     * @var AppointmentDeleteForm
     */
    private $appointmentForm;

    /**
     * AppointmentDeleteFormAction constructor.
     *
     * @param TemplateRendererInterface $template
     * @param AppointmentRepositoryInterface  $appointmentRepository
     * @param AppointmentDeleteForm           $appointmentForm
     */
    public function __construct(
        TemplateRendererInterface $template,
        AppointmentRepositoryInterface $appointmentRepository,
        AppointmentDeleteForm $appointmentForm
    ) {
        $this->template  = $template;
        $this->appointmentRepository = $appointmentRepository;
        $this->appointmentForm = $appointmentForm;
    }

    /**
     * {@inheritDoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $id = $request->getAttribute('id');

        $appointment = $this->appointmentRepository->fetchSingleAppointment($id);

        $message = 'Do you want to delete this appointment?';

        $this->appointmentForm->bind($appointment);

        $data = [
            'appointmentEntity' => $appointment,
            'appointmentForm'   => $this->appointmentForm,
            'message'     => $message,
        ];

        return new HtmlResponse(
            $this->template->render('appointment::delete', $data)
        );
    }
}

<?php
namespace Appointment\Action;

use Appointment\Form\AppointmentDataForm;
use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Expressive\Template\TemplateRendererInterface;

/**
 * Class AppointmentUpdateFormAction
 *
 * @package Appointment\Action
 */
class AppointmentUpdateFormAction implements ServerMiddlewareInterface
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
     * @var AppointmentDataForm
     */
    private $appointmentForm;

    /**
     * AppointmentUpdateFormAction constructor.
     *
     * @param TemplateRendererInterface $template
     * @param AppointmentRepositoryInterface  $appointmentRepository
     * @param AppointmentDataForm             $appointmentForm
     */
    public function __construct(
        TemplateRendererInterface $template,
        AppointmentRepositoryInterface $appointmentRepository,
        AppointmentDataForm $appointmentForm
    ) {
        $this->template  = $template;
        $this->appointmentRepository = $appointmentRepository;
        $this->appointmentForm = $appointmentForm;
    }

    /**
     * {@inheritdoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $id = $request->getAttribute('id');

        $appointment = $this->appointmentRepository->fetchSingleAppointment($id);

        if ($this->appointmentForm->getMessages()) {
            $message = 'Please check your input!';
        } else {
            $message = 'Please change the appointment!';

            $this->appointmentForm->bind($appointment);
        }

        $data = [
            'appointmentForm'   => $this->appointmentForm,
            'appointmentEntity' => $appointment,
            'message'     => $message,
        ];

        return new HtmlResponse(
            $this->template->render('appointment::update', $data)
        );
    }
}

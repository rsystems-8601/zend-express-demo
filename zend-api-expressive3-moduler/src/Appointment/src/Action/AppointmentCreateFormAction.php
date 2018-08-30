<?php
namespace Appointment\Action;

use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Expressive\Template\TemplateRendererInterface;
use Appointment\Form\AppointmentDataForm;

/**
 * Class AppointmentCreateFormAction
 *
 * @package Appointment\Action
 */
class AppointmentCreateFormAction implements ServerMiddlewareInterface
{
    /**
     * @var TemplateRendererInterface
     */
    private $template;

    /**
     * @var AppointmentDataForm
     */
    private $appointmentForm;

    /**
     * AppointmentCreateFormAction constructor.
     *
     * @param TemplateRendererInterface $template
     * @param AppointmentDataForm             $appointmentForm
     */
    public function __construct(
        TemplateRendererInterface $template,
        AppointmentDataForm $appointmentForm
    ) {
        $this->template  = $template;
        $this->appointmentForm = $appointmentForm;
    }

    /**
     * {@inheritDoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        if ($this->appointmentForm->getMessages()) {
            $message = 'Please check your input!';
        } else {
            $message = 'Please enter the new appointment!';
        }

        $data = [
            'appointmentForm' => $this->appointmentForm,
            'message'   => $message,
        ];

        return new HtmlResponse(
            $this->template->render('appointment::create', $data)
        );
    }
}

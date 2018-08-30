<?php

namespace Appointment\Action;

use Appointment\Model\Repository\AppointmentRepositoryInterface;
use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Expressive\Template\TemplateRendererInterface;

class AppointmentListAction implements ServerMiddlewareInterface
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
     * @param TemplateRendererInterface $template
     * @param AppointmentRepositoryInterface  $appointmentRepository
     */
    public function __construct(
        TemplateRendererInterface $template,
        AppointmentRepositoryInterface  $appointmentRepository
    ) {
        $this->template        = $template;
        $this->appointmentRepository = $appointmentRepository;
    }

    /**
     * {@inheritDoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $data = [
            'appointmentList' => $this->appointmentRepository->fetchAllAppointments(),
        ];

        return new HtmlResponse(
            $this->template->render('appointment::list', $data)
        );
    }
}

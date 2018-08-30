<?php
namespace Appointment\Action;

use Interop\Http\ServerMiddleware\DelegateInterface;
use Interop\Http\ServerMiddleware\MiddlewareInterface as ServerMiddlewareInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Expressive\Router\RouterInterface;
use Appointment\Form\AppointmentDataForm;
use Appointment\Model\Entity\AppointmentEntity;
use Appointment\Model\Repository\AppointmentRepositoryInterface;

/**
 * Class AppointmentCreateHandleAction
 *
 * @package Appointment\Action
 */
class AppointmentCreateHandleAction implements ServerMiddlewareInterface
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
     * AppointmentCreateHandleAction constructor.
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
     * {@inheritDoc}
     */
    public function process(ServerRequestInterface $request, DelegateInterface $delegate)
    {
        $postData = $request->getParsedBody();

        $this->appointmentForm->setData($postData);

        if ($this->appointmentForm->isValid()) {
            $appointment = new AppointmentEntity();
            $appointment->exchangeArray($postData);

            if ($this->appointmentRepository->saveAppointment($appointment)) {
                return new RedirectResponse(
                    $this->router->generateUri('appointment')
                );
            }
        }

        return $delegate->process($request);
    }
}

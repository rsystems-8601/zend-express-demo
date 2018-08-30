<?php

namespace Appointment;

/**
 * The configuration provider for the Appointment module
 *
 * @see https://docs.zendframework.com/zend-component-installer/
 */
class ConfigProvider
{
    /**
     * Returns the configuration array
     *
     * To add a bit of a structure, each section is defined in a separate
     * method which returns an array with its configuration.
     *
     * @return array
     */
    public function __invoke()
    {
        return [
            'dependencies' => $this->getDependencies(),
            'templates'    => $this->getTemplates(),
        ];
    }

    /**
     * Returns the container dependencies
     *
     * @return array
     */
    public function getDependencies()
    {
        return [
            'invokables' => [
            ],
            'factories'  => [
                Action\AppointmentListAction::class =>
                    Action\AppointmentListActionFactory::class,
                Action\AppointmentCreateFormAction::class =>
                    Action\AppointmentCreateFormActionFactory::class,
                Action\AppointmentCreateHandleAction::class =>
                    Action\AppointmentCreateHandleActionFactory::class,
                Action\AppointmentUpdateFormAction::class =>
                    Action\AppointmentUpdateFormActionFactory::class,
                Action\AppointmentUpdateHandleAction::class =>
                    Action\AppointmentUpdateHandleActionFactory::class,
                Action\AppointmentDeleteFormAction::class =>
                    Action\AppointmentDeleteFormActionFactory::class,
                Action\AppointmentDeleteHandleAction::class =>
                    Action\AppointmentDeleteHandleActionFactory::class,

                Model\Repository\AppointmentRepositoryInterface::class =>
                    Model\Repository\AppointmentRepositoryFactory::class,

                Model\InputFilter\AppointmentInputFilter::class =>
                    Model\InputFilter\AppointmentInputFilterFactory::class,

                Model\Storage\AppointmentStorageInterface::class =>
                    Db\AppointmentTableGatewayFactory::class,

                Form\AppointmentDataForm::class =>
                    Form\AppointmentDataFormFactory::class,
                Form\AppointmentDeleteForm::class =>
                    Form\AppointmentDeleteFormFactory::class,
            ],
        ];
    }

    /**
     * Returns the templates configuration
     *
     * @return array
     */
    public function getTemplates()
    {
        return [
            'paths' => [
                'appointment' => [__DIR__ . '/../templates/appointment'],
            ],
        ];
    }
}

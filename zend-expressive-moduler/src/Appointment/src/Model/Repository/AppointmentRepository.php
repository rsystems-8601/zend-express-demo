<?php

namespace Appointment\Model\Repository;

use Appointment\Model\Entity\AppointmentEntity;
use Appointment\Model\Storage\AppointmentStorageInterface;

class AppointmentRepository implements AppointmentRepositoryInterface
{
    /**
     * @var AppointmentStorageInterface
     */
    private $appointmentStorage;

    /**
     * AppointmentRepository constructor.
     *
     * @param AppointmentStorageInterface $appointmentStorage
     */
    public function __construct(AppointmentStorageInterface $appointmentStorage)
    {
        $this->appointmentStorage = $appointmentStorage;
    }

    /**
     * {@inheritDoc}
     */
    public function fetchAllAppointments()
    {
        return $this->appointmentStorage->fetchAppointmentList();
    }

    /**
     * {@inheritDoc}
     * Fetch a single appointment
     */
    public function fetchSingleAppointment($id)
    {
        return $this->appointmentStorage->fetchAppointmentById($id);
    }

    /**
     * {@inheritDoc}
     */
    public function saveAppointment(AppointmentEntity $appointment)
    {
        if (! $appointment->getId()) {
            return $this->appointmentStorage->insertAppointment($appointment);
        }

        return $this->appointmentStorage->updateAppointment($appointment);
    }

    /**
     * {@inheritDoc}
     */
    public function deleteAppointment(AppointmentEntity $appointment)
    {
        return $this->appointmentStorage->deleteAppointment($appointment);
    }
}

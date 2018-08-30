<?php

namespace Appointment\Model\Repository;

use Appointment\Model\Entity\AppointmentEntity;

interface AppointmentRepositoryInterface
{
    /**
     * Fetch all appointments.
     *
     * @return AppointmentEntity[]
     */
    public function fetchAllAppointments();

    /**
     * Fetch a single appointment by identifier.
     *
     * @param int $id
     * @return AppointmentEntity|null
     */
    public function fetchSingleAppointment($id);

    /**
     * Save an appointment.
     *
     * Should insert a new appointment if no identifier is present in the entity, and
     * update an existing appointment otherwise.
     *
     * @param AppointmentEntity $appointment
     * @return bool
     */
    public function saveAppointment(AppointmentEntity $appointment);

    /**
     * Delete an appointment.
     *
     * @param AppointmentEntity $appointment
     * @return bool
     */
    public function deleteAppointment(AppointmentEntity $appointment);
}

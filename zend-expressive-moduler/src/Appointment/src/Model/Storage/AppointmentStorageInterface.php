<?php

namespace Appointment\Model\Storage;

use Appointment\Model\Entity\AppointmentEntity;

interface AppointmentStorageInterface
{
    /**
     * Fetch a list of appointments.
     *
     * @return AppointmentEntity[]
     */
    public function fetchAppointmentList();

    /**
     * Fetch an appointment by identifer.
     *
     * @param int $id
     * @return AppointmentEntity|null
     */
    public function fetchAppointmentById($id);

    /**
     * Insert an appointment into storage.
     *
     * @param AppointmentEntity $appointment
     * @return bool
     */
    public function insertAppointment(AppointmentEntity $appointment);

    /**
     * Update an appointment.
     *
     * @param AppointmentEntity $appointment
     * @return bool
     */
    public function updateAppointment(AppointmentEntity $appointment);

    /**
     * Delete an appointment.
     *
     * @param AppointmentEntity $appointment
     * @return bool
     */
    public function deleteAppointment(AppointmentEntity $appointment);
}

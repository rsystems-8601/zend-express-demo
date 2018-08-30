<?php

namespace Appointment\Db;

use Appointment\Model\Entity\AppointmentEntity;
use Appointment\Model\Storage\AppointmentStorageInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\ResultSetInterface;
use Zend\Db\TableGateway\TableGateway;

class AppointmentTableGateway extends TableGateway implements AppointmentStorageInterface
{
    /**
     * @param AdapterInterface   $adapter
     * @param ResultSetInterface $resultSet
     */
    public function __construct(AdapterInterface $adapter, ResultSetInterface $resultSet)
    {
        parent::__construct('user_booking', $adapter, null, $resultSet);
    }

    /**
     * {@inheritDoc}
     */
    public function fetchAppointmentList()
    {
        $select = $this->getSql()->select();

        $collection = [];

        /** @var AppointmentEntity $entity */
        foreach ($this->selectWith($select) as $entity) {
            $collection[$entity->getId()] = $entity;
        }

        return $collection;
    }

    /**
     * {@inheritDoc}
     */
    public function fetchAppointmentById($id)
    {
        $select = $this->getSql()->select();
        $select->where->equalTo('id', $id);

        return $this->selectWith($select)->current();
    }

    /**
     * {@inheritDoc}
     */
    public function insertAppointment(AppointmentEntity $appointment)
    {
        $insertData = $appointment->getArrayCopy();

        $insert = $this->getSql()->insert();
        $insert->values($insertData);

        return $this->insertWith($insert) > 0;
    }

    /**
     * {@inheritDoc}
     */
    public function updateAppointment(AppointmentEntity $appointment)
    {
        $updateData = $appointment->getArrayCopy();

        $update = $this->getSql()->update();
        $update->set($updateData);
        $update->where->equalTo('id', $appointment->getId());

        return $this->updateWith($update) > 0;
    }

    /**
     * {@inheritDoc}
     */
    public function deleteAppointment(AppointmentEntity $appointment)
    {
        $delete = $this->getSql()->delete();
        $delete->where->equalTo('id', $appointment->getId());

        return $this->deleteWith($delete) > 0;
    }
}

<?php

namespace Appointment\Model\Entity;

use DomainException;
use Zend\Stdlib\ArraySerializableInterface;

class AppointmentEntity implements ArraySerializableInterface
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $reason;

    /**
     * @var string
     */
    private $username;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getReason()
    {
        return $this->reason;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        if ($id <= 0) {
            throw new DomainException(
                'Appointment id must be a positive integer!'
            );
        }

        $this->id = $id;
    }

    /**
     * @param string $reason
     */
    public function setReason($reason)
    {
        if (empty($reason) || strlen($reason) > 100) {
            throw new DomainException(
                'Appointment reason must be between 1 and 100 chars!'
            );
        }

        $this->reason = $reason;
    }

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        if (empty($username) || strlen($username) > 100) {
            throw new DomainException(
                'Appointment username must be between 1 and 100 chars!'
            );
        }

        $this->username = $username;
    }

    /**
     * @param array $array
     */
    public function exchangeArray(array $array)
    {
        foreach ($array as $key => $value) {
            $setter = 'set' . ucfirst($key);

            if (method_exists($this, $setter)) {
                $this->{$setter}($value);
            }
        }
    }

    /**
     * @return array
     */
    public function getArrayCopy()
    {
        $data = [];

        foreach (get_object_vars($this) as $key => $value) {
            $data[$key] = $value;
        }

        return $data;
    }
}

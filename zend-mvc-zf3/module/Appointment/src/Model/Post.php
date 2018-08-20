<?php
/**
 * Created by Pradeep Srivastav (pradeep.srivastav@rsystems.com)
 * Date: 08/16/2018 - Time: 17:51
 */

namespace Appointment\Model;


class Post
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
     * @var string
     */
    private $bookingdate;

    /**
     * @param string $username
     * @param string $reason
     * @param string $bookingdate
     * @param int|null $id
     */
    public function __construct($username, $reason,  $id = null)
    {
        $this->username = $username;
        $this->reason = $reason;
        $this->id = $id;
    }

    /**
     * @return int|null
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
    public function getBookingdate()
    {
        return $this->bookingdate;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }
}
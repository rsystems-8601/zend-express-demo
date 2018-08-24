<?php

/*
 * Author : Pradeep Srivastav 
 * Date Created: 08-16-2018
 * Sample Zend Expressive Application for php[architect]
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.  
 */
 
namespace App\Model;



use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\Driver\ResultInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Db\Sql\Sql;
use Zend\Http\Request;

/**
 * Interface for working with the Users table
 * Doesn't actually work, just here for demonstration purposes
 *
 * @package App\Model
 */
class Appointment
{
    /**
     * @var Adapter
     */
    protected $dbAdapter;
	
	protected $tableName;

    /**
     * Appointment constructor.
     * @param Adapter $dbAdapter
     */
    public function __construct(AdapterInterface $dbAdapter)
    {
        $this->dbAdapter = $dbAdapter;
        $this->tableName = 'Appointments';
    }
	
	public function getAppointment()
    {		
		$con = $this->dbAdapter;		
		$appointment_id = $this->getParam('id');		
		$where='';
		if($appointment_id  && is_numeric($appointment_id)){
			$where = " and id=? ";
		}		
		$stmt = $con->query("SELECT id, username, reason, DATE_FORMAT(booking_date,'%Y-%m-%d %h:%i') as booking_date, DATE_FORMAT(end_time,'%Y-%m-%d %h:%i') as end_time, is_deleted FROM ".$this->tableName." where is_deleted!=1 ".$where);
		if($appointment_id  && is_numeric($appointment_id)){			
			$result = $stmt->execute(array($appointment_id));
		}else{
			$result = $stmt->execute();
		}
		
		$result->getResource()->setFetchMode(\PDO::FETCH_ASSOC);
		return $result->getResource()->fetchAll();
		
    }
	
	public function updateAppointment()
    {
		$con = $this->dbAdapter;
		$appointment_id = $this->getPostParam('appointment_id');		
		$where='';
		$updateStatus= false;
		if($appointment_id  && is_numeric($appointment_id)){			
			$username = $this->getPostParam('full_name');
			$reason = $this->getPostParam('appointment_reason');
			$booking_date = $this->getPostParam('appointment_time');	
			try{
				$stmt = $con->query("UPDATE ".$this->tableName." SET `username` = ?, `reason` = ?, `booking_date` = ? WHERE `id` = ?" );
				$stmt->execute(array($username,$reason,$booking_date,$appointment_id));
				$updateStatus= true;
			}catch(Exception $e){
				// Exception to be handled here 
			}
		}
		return $updateStatus;			
	}
	
	public function deleteAppointment()
    {	
		$con = $this->dbAdapter;		
		$appointment_id = $this->getPostParam('id');		
		$where='';
		$updateStatus= false;		
		if($appointment_id  && is_numeric($appointment_id)){			
			try{
				$stmt = $con->query("UPDATE ".$this->tableName." SET `is_deleted` =1 WHERE `id` =?");
				$stmt->execute(array($appointment_id));
				$updateStatus= true;
			}catch(Exception $e){
				// Exception to be handled here
			}
		}
		return $updateStatus;
	}
	
	public function createAppointment()
    {	
		$con = $this->dbAdapter;		
		$username = $this->getPostParam('full_name');		
		$where='';
		$updateStatus= false;
		if($username  && $username!=''){						
			$reason = $this->getPostParam('appointment_reason');
			$booking_date = $this->getPostParam('appointment_time');	
			$endTime = date("Y-m-d H:i",strtotime($booking_date)+900);
			try{
				$stmt = $con->query("INSERT INTO `Appointments` ( `username`, `reason`, `booking_date`,`end_time`) VALUES (?,?,?,?)");
				$stmt->execute(array($username, $reason, $booking_date,$endTime));
				$updateStatus= true;
			}catch(Exception $e){
				// Exception to be handled here		
			}
		}
		return $updateStatus;
	}
	
	
	function getParam($key){
		return isset($_GET[$key])? $_GET[$key]:false;
	}
	
	function getPostParam($key){
		return isset($_POST[$key])? $_POST[$key]:false;
	}
	
	
}
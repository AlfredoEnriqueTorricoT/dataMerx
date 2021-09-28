<?php

namespace App\cad\dto\DeviceSim;

class DeviceSim {
  public $id;
  public $deviceid;
  public $simid;
  public $date_start;
  public $date_end;
  public $userid;


  /**
   * Get the value of id
   */ 
  public function getId()
  {
    return $this->id;
  }

  /**
   * Set the value of id
   *
   * @return  self
   */ 
  public function setId($id)
  {
    $this->id = $id;

    return $this;
  }

  /**
   * Get the value of deviceid
   */ 
  public function getDeviceid()
  {
    return $this->deviceid;
  }

  /**
   * Set the value of deviceid
   *
   * @return  self
   */ 
  public function setDeviceid($deviceid)
  {
    $this->deviceid = $deviceid;

    return $this;
  }

  /**
   * Get the value of simid
   */ 
  public function getSimid()
  {
    return $this->simid;
  }

  /**
   * Set the value of simid
   *
   * @return  self
   */ 
  public function setSimid($simid)
  {
    $this->simid = $simid;

    return $this;
  }

  /**
   * Get the value of date_start
   */ 
  public function getDate_start()
  {
    return $this->date_start;
  }

  /**
   * Set the value of date_start
   *
   * @return  self
   */ 
  public function setDate_start($date_start)
  {
    $this->date_start = $date_start;

    return $this;
  }

  /**
   * Get the value of date_end
   */ 
  public function getDate_end()
  {
    return $this->date_end;
  }

  /**
   * Set the value of date_end
   *
   * @return  self
   */ 
  public function setDate_end($date_end)
  {
    $this->date_end = $date_end;

    return $this;
  }

  /**
   * Get the value of userid
   */ 
  public function getUserid()
  {
    return $this->userid;
  }

  /**
   * Set the value of userid
   *
   * @return  self
   */ 
  public function setUserid($userid)
  {
    $this->userid = $userid;

    return $this;
  }
}
?>
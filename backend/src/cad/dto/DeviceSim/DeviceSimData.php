<?php

namespace App\cad\dto\DeviceSim;

class DeviceSimData {
  public $date_start;
  public $code;
  public $name;
  public $deviceImei;
  public $markId;
  public $platformId;
  public $cod;
  public $number;
  public $simImei;

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
   * Get the value of code
   */ 
  public function getCode()
  {
    return $this->code;
  }

  /**
   * Set the value of code
   *
   * @return  self
   */ 
  public function setCode($code)
  {
    $this->code = $code;

    return $this;
  }

  /**
   * Get the value of name
   */ 
  public function getName()
  {
    return $this->name;
  }

  /**
   * Set the value of name
   *
   * @return  self
   */ 
  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  /**
   * Get the value of deviceImei
   */ 
  public function getDeviceImei()
  {
    return $this->deviceImei;
  }

  /**
   * Set the value of deviceImei
   *
   * @return  self
   */ 
  public function setDeviceImei($deviceImei)
  {
    $this->deviceImei = $deviceImei;

    return $this;
  }

  /**
   * Get the value of markId
   */ 
  public function getMarkId()
  {
    return $this->markId;
  }

  /**
   * Set the value of markId
   *
   * @return  self
   */ 
  public function setMarkId($markId)
  {
    $this->markId = $markId;

    return $this;
  }

  /**
   * Get the value of platformId
   */ 
  public function getPlatformId()
  {
    return $this->platformId;
  }

  /**
   * Set the value of platformId
   *
   * @return  self
   */ 
  public function setPlatformId($platformId)
  {
    $this->platformId = $platformId;

    return $this;
  }

  /**
   * Get the value of cod
   */ 
  public function getCod()
  {
    return $this->cod;
  }

  /**
   * Set the value of cod
   *
   * @return  self
   */ 
  public function setCod($cod)
  {
    $this->cod = $cod;

    return $this;
  }

  /**
   * Get the value of number
   */ 
  public function getNumber()
  {
    return $this->number;
  }

  /**
   * Set the value of number
   *
   * @return  self
   */ 
  public function setNumber($number)
  {
    $this->number = $number;

    return $this;
  }

  /**
   * Get the value of simImei
   */ 
  public function getSimImei()
  {
    return $this->simImei;
  }

  /**
   * Set the value of simImei
   *
   * @return  self
   */ 
  public function setSimImei($simImei)
  {
    $this->simImei = $simImei;

    return $this;
  } 
}
?>
<?php

namespace App\cad\dto;

class Device {
  public $id;
  public $imei;
  public $code;
  public $reception;
  public $active;
  public $markId;
  public $platformId;

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
   * Get the value of imei
   */ 
  public function getImei()
  {
    return $this->imei;
  }

  /**
   * Set the value of imei
   *
   * @return  self
   */ 
  public function setImei($imei)
  {
    $this->imei = $imei;

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
   * Get the value of reception
   */ 
  public function getReception()
  {
    return $this->reception;
  }

  /**
   * Set the value of reception
   *
   * @return  self
   */ 
  public function setReception($reception)
  {
    $this->reception = $reception;

    return $this;
  }

  /**
   * Get the value of active
   */ 
  public function getActive()
  {
    return $this->active;
  }

  /**
   * Set the value of active
   *
   * @return  self
   */ 
  public function setActive($active)
  {
    $this->active = $active;

    return $this;
  }
}
?>
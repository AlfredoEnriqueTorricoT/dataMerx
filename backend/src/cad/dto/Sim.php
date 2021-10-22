<?php

namespace API\MODEL;

class Sim {
  public $id;
  public $imei;
  public $number;
  public $f_reception;
  public $cod;
  public $active;


  

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
   * Get the value of f_reception
   */ 
  public function getF_reception()
  {
    return $this->f_reception;
  }

  /**
   * Set the value of f_reception
   *
   * @return  self
   */ 
  public function setF_reception($f_reception)
  {
    $this->f_reception = $f_reception;

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
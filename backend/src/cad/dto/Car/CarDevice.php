<?php

namespace App\cad\dto\Car;

class CarDevice {
  public $id;
  public $placa;
  public $model;
  public $mark;
  public $date_start;
  public $date_end;
  public $clientid;
  public $clientName;

  public $code;
  public $name;

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
   * Get the value of placa
   */ 
  public function getPlaca()
  {
    return $this->placa;
  }

  /**
   * Set the value of placa
   *
   * @return  self
   */ 
  public function setPlaca($placa)
  {
    $this->placa = $placa;

    return $this;
  }

  /**
   * Get the value of model
   */ 
  public function getModel()
  {
    return $this->model;
  }

  /**
   * Set the value of model
   *
   * @return  self
   */ 
  public function setModel($model)
  {
    $this->model = $model;

    return $this;
  }

  /**
   * Get the value of mark
   */ 
  public function getMark()
  {
    return $this->mark;
  }

  /**
   * Set the value of mark
   *
   * @return  self
   */ 
  public function setMark($mark)
  {
    $this->mark = $mark;

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
   * Get the value of clientid
   */ 
  public function getClientid()
  {
    return $this->clientid;
  }

  /**
   * Set the value of clientid
   *
   * @return  self
   */ 
  public function setClientid($clientid)
  {
    $this->clientid = $clientid;

    return $this;
  }

  /**
   * Get the value of clientName
   */ 
  public function getClientName()
  {
    return $this->clientName;
  }

  /**
   * Set the value of clientName
   *
   * @return  self
   */ 
  public function setClientName($clientName)
  {
    $this->clientName = $clientName;

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
}
?>
<?php

namespace App\cad\dto;

class Client {
  public $id;
  public $name;
  public $last_name;
  public $mother_last_name;
  public $telefono;
  public $empresa;

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
   * Get the value of last_name
   */ 
  public function getLast_name()
  {
    return $this->last_name;
  }

  /**
   * Set the value of last_name
   *
   * @return  self
   */ 
  public function setLast_name($last_name)
  {
    $this->last_name = $last_name;

    return $this;
  }

  /**
   * Get the value of mother_last_name
   */ 
  public function getMother_last_name()
  {
    return $this->mother_last_name;
  }

  /**
   * Set the value of mother_last_name
   *
   * @return  self
   */ 
  public function setMother_last_name($mother_last_name)
  {
    $this->mother_last_name = $mother_last_name;

    return $this;
  }

  /**
   * Get the value of telefono
   */ 
  public function getTelefono()
  {
    return $this->telefono;
  }

  /**
   * Set the value of telefono
   *
   * @return  self
   */ 
  public function setTelefono($telefono)
  {
    $this->telefono = $telefono;

    return $this;
  }

  /**
   * Get the value of empresa
   */ 
  public function getEmpresa()
  {
    return $this->empresa;
  }

  /**
   * Set the value of empresa
   *
   * @return  self
   */ 
  public function setEmpresa($empresa)
  {
    $this->empresa = $empresa;

    return $this;
  }
}
?>
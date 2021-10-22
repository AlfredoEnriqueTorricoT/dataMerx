<?php

namespace API\MODEL;

class User {
  public $id;
  public $name;
  public $lastName;
  public $email;
  public $password;
  public $state;

    


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
   * Get the value of lastName
   */ 
  public function getLastName()
  {
    return $this->lastName;
  }

  /**
   * Set the value of lastName
   *
   * @return  self
   */ 
  public function setLastName($lastName)
  {
    $this->lastName = $lastName;

    return $this;
  }

  /**
   * Get the value of state
   */ 
  public function getState()
  {
    return $this->state;
  }

  /**
   * Set the value of state
   *
   * @return  self
   */ 
  public function setState($state)
  {
    $this->state = $state;

    return $this;
  }

  /**
   * Get the value of password
   */ 
  public function getPassword()
  {
    return $this->password;
  }

  /**
   * Set the value of password
   *
   * @return  self
   */ 
  public function setPassword($password)
  {
    $this->password = $password;

    return $this;
  }

  /**
   * Get the value of email
   */ 
  public function getEmail()
  {
    return $this->email;
  }

  /**
   * Set the value of email
   *
   * @return  self
   */ 
  public function setEmail($email)
  {
    $this->email = $email;

    return $this;
  }
}

?>
<?php

namespace App\cad\dto\Event;

class Event {
  public $id;
  public $tableAffected;
  public $rowidAffected;
  public $detail;
  public $tableNewValue;
  public $rowNewValue;
  public $date_start;
  public $userid;
  public $typeid;

  

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
   * Get the value of tableAffected
   */ 
  public function getTableAffected()
  {
    return $this->tableAffected;
  }

  /**
   * Set the value of tableAffected
   *
   * @return  self
   */ 
  public function setTableAffected($tableAffected)
  {
    $this->tableAffected = $tableAffected;

    return $this;
  }

  /**
   * Get the value of rowAffected
   */ 
  public function getRowidAffected()
  {
    return $this->rowidAffected;
  }

  /**
   * Set the value of rowAffected
   *
   * @return  self
   */ 
  public function setRowidAffected($rowidAffected)
  {
    $this->rowidAffected = $rowidAffected;

    return $this;
  }

  /**
   * Get the value of detail
   */ 
  public function getDetail()
  {
    return $this->detail;
  }

  /**
   * Set the value of detail
   *
   * @return  self
   */ 
  public function setDetail($detail)
  {
    $this->detail = $detail;

    return $this;
  }

  /**
   * Get the value of tableNewValue
   */ 
  public function getTableNewValue()
  {
    return $this->tableNewValue;
  }

  /**
   * Set the value of tableNewValue
   *
   * @return  self
   */ 
  public function setTableNewValue($tableNewValue)
  {
    $this->tableNewValue = $tableNewValue;

    return $this;
  }

  /**
   * Get the value of rowNewValue
   */ 
  public function getRowNewValue()
  {
    return $this->rowNewValue;
  }

  /**
   * Set the value of rowNewValue
   *
   * @return  self
   */ 
  public function setRowNewValue($rowNewValue)
  {
    $this->rowNewValue = $rowNewValue;

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

  /**
   * Get the value of typeid
   */ 
  public function getTypeid()
  {
    return $this->typeid;
  }

  /**
   * Set the value of typeid
   *
   * @return  self
   */ 
  public function setTypeid($typeid)
  {
    $this->typeid = $typeid;

    return $this;
  }
}
?>
<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\TypeEvent;
use PDO;
class TypeEventBLL
{

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = "select * from typeevents;";
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDto($row);
        $lista[] = $obj;
    }
    return $lista;
  }





  public function rowToDto($row)
  {
      $obj = new TypeEvent();
      $obj ->setId($row['id']);
      $obj ->setName($row['name']);
      $obj ->setImg($row['img']);
      return $obj;
  }
}

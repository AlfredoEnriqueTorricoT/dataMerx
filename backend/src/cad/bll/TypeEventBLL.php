<?php


namespace API\BLL;

include_once "./src/cad/dal/Conexion.php";
include_once "./src/cad/dto/TypeEvent.php";

use API\CONEXION\Conexion;
use API\MODEL\TypeEvent;

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

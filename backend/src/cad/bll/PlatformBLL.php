<?php


namespace API\BLL;

include_once "./src/cad/dal/Conexion.php";
include_once "./src/cad/dto/Platform.php";

use API\CONEXION\Conexion;
use API\MODEL\Platform;


use PDO;
class PlatformBLL
{

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = "select * from platform  order by id;";
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
      $obj = new Platform();
      $obj ->setId($row['id']);
      return $obj;
  }
}

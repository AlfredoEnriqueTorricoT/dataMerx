<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\Platform;
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

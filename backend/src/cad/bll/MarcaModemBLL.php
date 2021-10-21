<?php


namespace API\BLL;

include_once "./src/cad/dal/Conexion.php";
include_once "./src/cad/dto/MarcaModem.php";

use API\CONEXION\Conexion;
use API\MODEL\MarcaModem;



use PDO;
class MarcaModemBLL
{

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = "select * from markModem order by id;";
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
      $obj = new MarcaModem();
      $obj ->setId($row['id']);
      return $obj;
  }
}

<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\MarcaModem;
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

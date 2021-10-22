<?php


namespace API\BLL;

include_once "./src/cad/dal/Conexion.php";
include_once "./src/cad/dto/Client.php";

use API\CONEXION\Conexion;
use API\MODEL\Client;


use PDO;
class ClientBLL
{

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = "select * from clients;";
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDto($row);
        $lista[] = $obj;
    }
    return $lista;
  }


  public function selectById($id) {
    $claseConexion = new Conexion();
    $sql = "select * from clients where id = :p_id";
    $res = $claseConexion->queryWithParams($sql, array(
        ":p_id" => $id
    ));

    
    if ($res->rowCount() == 0) {
        return null;
    }
    $row = $res->fetch(PDO::FETCH_ASSOC);
    $obj = $this->rowToDto($row);
    return $obj;
  }


  public function insert($data) {
    $obj = new Client();
    $claseConexion = new Conexion();
    $sql = "call sp_client_insert(:_name, :_last_name, :_mother_last_name, :_telefono, :_empresa);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_name" => $data->name,
            ":_last_name"=> $data->last_name,
            ":_mother_last_name"=> $data->mother_last_name,
            ":_telefono"=> $data->telefono,
            ":_empresa"=> $data->empresa
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }

  public function update($data) {
    $obj = new Client();
    $claseConexion = new Conexion();
    $sql = "call sp_client_update(:_id, :_name, :_last_name, :_mother_last_name, :_telefono, :_empresa);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_name" => $data->name,
            ":_last_name"=> $data->last_name,
            ":_mother_last_name"=> $data->mother_last_name,
            ":_telefono"=> $data->telefono,
            ":_empresa"=> $data->empresa
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }

  public function rowToDto($row)
  {
      $obj = new Client();
      $obj ->setId($row['id']);
      $obj ->setName($row['name']);
      $obj ->setLast_name($row['last_name']);
      $obj ->setMother_last_name($row['mother_last_name']);
      $obj ->setTelefono($row['telefono']);
      $obj ->setEmpresa($row['empresa']);

      return $obj;
  }
}

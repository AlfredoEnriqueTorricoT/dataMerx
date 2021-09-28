<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\Car;
use PDO;
class CarBLL
{

    

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = 'select c.*, concat(cl.name, " ",cl.last_name, " ", cl.mother_last_name, " (",cl.empresa, ")") as clientName from cars c
    join clients cl on c.clientid = cl.id;';
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDtoSelect($row);
        $lista[] = $obj;
    }
    return $lista;
  }


  public function selectById($id) {
    $claseConexion = new Conexion();
    $sql = "select * from devices where id = :p_id";
    $res = $claseConexion->queryWithParams($sql, array(
        ":p_id" => $id
    ));

    
    if ($res->rowCount() == 0) {
        return null;
    }
    $row = $res->fetch(PDO::FETCH_ASSOC);
    $obj = $this->rowToDtoSelect($row);
    return $obj;
  }


  public function insert($data) {
    $obj = new Car();
    $claseConexion = new Conexion();
    $sql = "call sp_car_insert(:_placa, :_model, :_mark, :_date_start, :_clientid);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_placa" => $data->placa,
            ":_model"=> $data->model,
            ":_mark"=> $data->mark,
            ":_date_start"=> $data->date_start,
            ":_clientid"=> $data->clientid
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDtoInsert($row);
        
        
        return json_encode(["status" => 200, "data"=>$obj]);
    } catch (\PDOException $e) {
        return json_encode(["status" => 401, "message"=>$e->getMessage()]);
    }
  }

  public function update($data) {
    $obj = new Car();
    $claseConexion = new Conexion();
    $sql = "call sp_car_update(:_id,:_placa, :_model, :_mark, :_date_start, :_date_end, :_clientid);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_placa" => $data->placa,
            ":_model"=> $data->model,
            ":_mark"=> $data->mark,
            ":_date_start"=> $data->date_start,
            ":_date_end"=> $data->date_end,
            ":_clientid"=> $data->clientid
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDtoInsert($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }

  public function rowToDtoInsert($row)
  {
      $obj = new Car();
      $obj ->setId($row['id']);
      $obj ->setPlaca($row['placa']);
      $obj ->setModel($row['model']);
      $obj ->setMark($row['mark']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setClientid($row['clientid']);
      return $obj;
  }

  public function rowToDtoSelect($row)
  {
      $obj = new Car();
      $obj ->setId($row['id']);
      $obj ->setPlaca($row['placa']);
      $obj ->setModel($row['model']);
      $obj ->setMark($row['mark']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setDate_end($row['date_end']);
      $obj ->setClientid($row['clientid']);
      $obj ->setClientName($row['clientName']);
      return $obj;
  }
}

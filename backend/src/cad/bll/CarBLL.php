<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\Car;
use App\cad\dto\Car\CarDevice;
use PDO;
class CarBLL
{

    

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = 'select c.*, concat(cl.name, " ",cl.last_name, " ", cl.mother_last_name, " (",cl.empresa, ")") as clientName, d.code, d.name from cars c
    join clients cl on c.clientid = cl.id
    left join devices d on c.deviceid = d.id;';
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

  public function insertDeviceToCar($data) {
    $obj = new Car();
    $claseConexion = new Conexion();
    $sql = "call sp_addDeviceToCar(:_id, :_deviceid, :_userid);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id"=> $data->id,
            ":_deviceid"=> $data->deviceid,
            ":_userid"=> $data->userid
            
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDtoInsert($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
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

  public function rowToDto($row)
  {
      $obj = new CarDevice();
      $obj ->setId($row['id']);
      $obj ->setPlaca($row['placa']);
      $obj ->setModel($row['model']);
      $obj ->setMark($row['mark']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setDate_end($row['date_end']);
      $obj ->setClientid($row['clientid']);
      $obj ->setClientName($row['clientName']);
      $obj ->setCode($row['code']);
      $obj ->setName($row['name']);
      return $obj;
  }

  public function rowToDtoSelect($row)
  {
      $obj = new CarDevice();
      $obj ->setId($row['id']);
      $obj ->setPlaca($row['placa']);
      $obj ->setModel($row['model']);
      $obj ->setMark($row['mark']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setDate_end($row['date_end']);
      $obj ->setClientid($row['clientid']);
      $obj ->setClientName($row['clientName']);
      $obj ->setCode($row['code']);
      $obj ->setName($row['name']);
      return $obj;
  }
}

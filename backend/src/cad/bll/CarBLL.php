<?php


namespace API\BLL;

include_once "./src/cad/dal/Conexion.php";
include_once "./src/cad/dto/Car.php";
include_once "./src/cad/dto/Car/CarDevice.php";

use API\CONEXION\Conexion;
use API\MODEL\Car;
use API\MODEL\CarDevice;


use PDO;
class CarBLL
{

    

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = 'select c.*, cl.empresa as clientName, d.code from cars c
    join clients cl on c.clientid = cl.id
    left join devices d on c.deviceid = d.id';
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
    $sql = "call sp_car_insert(:_name, :_placa, :_model, :_mark, :_date_start, :_clientid);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_name" => $data->name,
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

  public function retirarDevice($data) {
    $obj = new Car();
    $claseConexion = new Conexion();
    $sql = "call sp_carDevice_retirar(:_carid, :_userid);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_carid" => $data->carid,
            ":_userid"=> $data->userid
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto2($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }


  public function update($data) {
    $obj = new Car();
    $claseConexion = new Conexion();
    $sql = "call sp_car_update(:_id,:_name,:_placa, :_model, :_mark, :_date_start, :_date_end, :_clientid);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_name" => $data->name,
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
      $obj ->setName($row['name']);
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
      $obj ->setName($row['name']);
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
  public function rowToDto2($row)
  {
      $obj = new CarDevice();
      $obj ->setId($row['id']);
      $obj ->setName($row['name']);
      $obj ->setPlaca($row['placa']);
      $obj ->setModel($row['model']);
      $obj ->setMark($row['mark']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setDate_end($row['date_end']);
      $obj ->setClientid($row['clientid']);
      $obj ->setName($row['name']);
      return $obj;
  }

  public function rowToDtoSelect($row)
  {
      $obj = new CarDevice();
      $obj ->setId($row['id']);
      $obj ->setName($row['placa']);
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

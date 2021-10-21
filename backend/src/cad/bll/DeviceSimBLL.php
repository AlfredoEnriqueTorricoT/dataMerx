<?php


namespace API\BLL;

include_once "./src/cad/dal/Conexion.php";
include_once "./src/cad/dto/DeviceSim.php";
include_once "./src/cad/dto/DeviceSimData.php";

use API\CONEXION\Conexion;
use API\MODEL\DeviceSim;
use API\MODEL\DeviceSimData;


use PDO;
class DeviceSimBLL
{

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = '
    select ds.date_start, d.code, d.name, d.imei as deviceImei, markId, platformId, 
        s.cod, s.number, s.imei as simImei from device_sim ds
    join devices d on d.id = ds.deviceid
    join sims s on s.id = ds.simid
    where date_end is  null;';

    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDtoData($row);
        $lista[] = $obj;
    }
    return $lista;
  }

    public function insert($data) {
        $obj = new DeviceSim();
        $claseConexion = new Conexion();
        $sql = "call sp_deviceSim_insert(:_deviceid,:_simid,:_userid, :_date_start);";
        try {
                
            $res = $claseConexion->queryWithParams($sql, array(
                ":_deviceid" => $data->deviceid,
                ":_simid" => $data->simid,
                ":_userid"=> $data->userid,
                ":_date_start"=> $data->date_start,
                
            ));
            $row = $res->fetch(PDO::FETCH_ASSOC);
            $obj = $this->rowToDto($row);
            
            
            return $obj;
        } catch (\PDOException $e) {
            return $e;
        }
    }

  public function update($data) {
    $obj = new Device();
    $claseConexion = new Conexion();
    $sql = "call sp_device_update(:_id,:_imei,:_name, :_code, :_reception, :_active, :_markId, :_platformId);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_imei" => $data->imei,
            ":_name" => $data->name,
            ":_code"=> $data->code,
            ":_reception"=> $data->reception,
            ":_active"=> $data->active,
            ":_markId"=> $data->markId,
            ":_platformId"=> $data->platformId
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }

  public function retirarSim($data) {
    $obj = new DeviceSim();
    $claseConexion = new Conexion();
    $sql = "call sp_deviceSim_retirar(:_deviceid, :_userid);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_deviceid" => $data->deviceid,
            ":_userid"=> $data->userid
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
      $obj = new DeviceSim();
      if(isset($row['id'])){
          $obj ->setId($row['id']);
        }
        $obj ->setDeviceid($row['deviceid']);
        $obj ->setSimid($row['simid']);
        $obj ->setUserid($row['userid']);
        $obj ->setDate_start($row['date_start']);
        $obj ->setDate_end($row['date_end']);
        
      return $obj;
  }

  public function rowToDtoData($row)
  {
      $obj = new DeviceSimData();
      $obj ->setDate_start($row['date_start']);
      $obj ->setCode($row['code']);
      $obj ->setName($row['name']);
      $obj ->setDeviceImei($row['deviceImei']);
      $obj ->setMarkId($row['markId']);
      $obj ->setPlatformId($row['platformId']);
      $obj ->setCod($row['cod']);
      $obj ->setNumber($row['number']);
      $obj ->setSimImei($row['simImei']);

      return $obj;
  }
}

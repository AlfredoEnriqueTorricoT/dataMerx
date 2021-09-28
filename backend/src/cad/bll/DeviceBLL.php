<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\Device;
use App\cad\dto\Device\DeviceSim;
use PDO;
class DeviceBLL
{

    

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = '
    select * from devices d
    join sims s on d.simid = s.id
    ';
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDtoDeviceSim($row);
        $lista[] = $obj;
    }
    return $lista;
  }

  public function selectAllDisponible() {
    $claseConexion = new Conexion();
    $sql = '
    select d.* from(select * from cars where deviceid is not null) dc
    right join devices d on dc.deviceid = d.id
    where dc.deviceid is null;
    ';
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDto($row);
        $lista[] = $obj;
    }
    return $lista;
  }

  public function retirarSim($data) {
    $obj = new Device();
    $claseConexion = new Conexion();
    $sql = "call sp_device_retirarSim(:_deviceid, :_userid);";

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
    $obj = $this->rowToDto($row);
    return $obj;
  }


  public function insert($data) {
    $obj = new Device();
    $claseConexion = new Conexion();
    $sql = "call sp_device_insert(:_imei,:_name, :_code, :_reception, :_active, :_markId, :_platformId);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
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

  public function rowToDto($row)
  {
      $obj = new Device();
      $obj ->setId($row['id']);
      $obj ->setImei($row['imei']);
      $obj ->setName($row['name']);
      $obj ->setCode($row['code']);
      $obj ->setReception($row['reception']);
      $obj ->setActive($row['active']);
      $obj ->setMarkId($row['markId']);
      $obj ->setPlatformId($row['platformId']);

      return $obj;
  }

  public function rowToDtoDeviceSim($row)
  {
      $obj = new DeviceSim();
      $obj ->setId($row['id']);
      $obj ->setImei($row['imei']);
      $obj ->setName($row['name']);
      $obj ->setCode($row['code']);
      $obj ->setReception($row['reception']);
      $obj ->setActive($row['active']);
      $obj ->setMarkId($row['markId']);
      $obj ->setPlatformId($row['platformId']);
      $obj ->setNumber($row['number']);
      $obj ->setCod($row['cod']);

      return $obj;
  }
}

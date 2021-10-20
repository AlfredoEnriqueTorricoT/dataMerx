<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\Event\Event;
use App\cad\dto\Event\EventVinculo;
use PDO;
class EventBLL
{

    

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = '
    select * from events;
    ';
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDto($row);
        $lista[] = $obj;
    }
    return $lista;
  }


  public function selectAllByElement($data) {

    $claseConexion = new Conexion();
    $sql = '
    select t.*, te.name, te.img, case (tableNewValue)
      when "car" then (select concat("Vehículo ",placa) from cars where id = '.$data->id.')
      when "device" then (select concat("Dispositivo ",code) from devices where id = '.$data->id.')
      when "sim" then (select concat("Sim ",cod) from sims where id = '.$data->id.')
      else 0
      end as vinculo
      from(select * from events where tableAffected = "'.$data->obj.'" and rowAffected = '.$data->id.') t
      join typeEvents te on t.typeid = te.id;
    ';
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDtoVinculo($row);
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
    $obj = $this->rowToDto($row);
    return $obj;
  }


  public function insert($data) {
    $obj = new Event();
    $claseConexion = new Conexion();
    $sql = "call sp_event_insert( :_tableAffected, :_rowAffected, :_detail, :_now, :_userid, :_typeevent)";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_tableAffected" => $data->tableAffected,
            ":_rowAffected" => $data->rowAffected,
            ":_detail"=> $data->detail,
            ":_now"=> $data->now,
            ":_userid"=> $data->userid,
            ":_typeevent"=> $data->typeevent
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }
  

  public function update($data) {
    $obj = new Event();
    $claseConexion = new Conexion();
    $sql = "call sp_event_update(:_id, :_tableAffected, :_rowAffected, :_detail, :_now, :_userid, :_typeid);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_tableAffected" => $data->tableAffected,
            ":_rowAffected" => $data->rowAffected,
            ":_detail"=> $data->detail,
            ":_now"=> $data->now,
            ":_userid"=> $data->userid,
            ":_typeid"=> $data->typeevent
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
      $obj = new Event();
      $obj ->setId($row['id']);
      $obj ->setTableAffected($row['tableAffected']);
      $obj ->setRowAffected($row['rowAffected']);
      $obj ->setDetail($row['detail']);
      $obj ->setTableNewValue($row['tableNewValue']);
      $obj ->setRowidNewValue($row['rowidNewValue']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setUserid($row['userid']);
      $obj ->setTypeid($row['typeid']);

      return $obj;
  }

  public function rowToDtoVinculo($row)
  {
      $obj = new EventVinculo();
      $obj ->setId($row['id']);
      $obj ->setTableAffected($row['tableAffected']);
      $obj ->setRowAffected($row['rowAffected']);
      $obj ->setDetail($row['detail']);
      $obj ->setTableNewValue($row['tableNewValue']);
      $obj ->setRowidNewValue($row['rowidNewValue']);
      $obj ->setDate_start($row['date_start']);
      $obj ->setUserid($row['userid']);
      $obj ->setTypeid($row['typeid']);
      $obj ->setVinculo($row['vinculo']);

      return $obj;
  }
}

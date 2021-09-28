<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\Sim;
use PDO;
class SimBLL
{

    

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = "select * from sims";
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDto($row);
        $lista[] = $obj;
    }
    return $lista;
  }

  public function selectAllDisponibles() {
    $claseConexion = new Conexion();
    $sql = '
      select s.* from(select * from devices where simid is not null) sd
      right join sims s on sd.simid = s.id
      where sd.simid is null;
    ';
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
    $sql = "select * from sims where id = :p_id";
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
    $obj = new Sim();
    $claseConexion = new Conexion();
    $sql = "call sp_sims_insert(:_imei,:_number, :_f_reception, :_cod);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_imei" => $data->imei,
            ":_number" => $data->number,
            ":_f_reception"=> $data->f_reception,
            ":_cod"=> $data->cod
            
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }

  public function update($data) {
    $obj = new Sim();
    $claseConexion = new Conexion();
    $sql = "call sp_sim_update(:_id,:_imei,:_number, :_f_reception, :_cod, :_active);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_imei" => $data->imei,
            ":_number" => $data->number,
            ":_f_reception"=> $data->f_reception,
            ":_cod"=> $data->cod,
            ":_active"=> $data->active,
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
      $obj = new Sim();
      $obj ->setId($row['id']);
      $obj ->setImei($row['imei']);
      $obj ->setNumber($row['number']);
      $obj ->setF_reception($row['f_reception']);
      $obj ->setCod($row['cod']);
      $obj ->setActive($row['active']);

      return $obj;
  }
}

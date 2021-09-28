<?php


namespace App\cad\bll;


use App\cad\dal\Conexion;
use App\cad\dto\User;
use PDO;
class UserBLL
{

    public function login($data) {
        $claseConexion = new Conexion();
        $sql = "select id, name, lastName, email, state from users where email=:_email and password = sha1(:_password);";

        try {
            $res = $claseConexion->queryWithParams($sql, array(
                ":_email" => $data->email,
                ":_password"=> $data->password
            ));
            if ($res->rowCount() == 0) {
                return null;
            }
            $row = $res->fetch(\PDO::FETCH_ASSOC);
            $obj = $this->rowToDto($row);
            return $obj;
        } catch (\PDOException $e) {
            return null;
        }
    }

  public function selectAll() {
    $claseConexion = new Conexion();
    $sql = "select id, name, lastName, email, state from users";
    $res = $claseConexion->query($sql);
    $lista = array();
    while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
        $obj = $this->rowToDto($row);
        $lista[] = $obj;
    }
    return $lista;
  }


  public function selectById($usuarioId) {
    $claseConexion = new Conexion();
    $sql = "select id, name, lastName, email, state from users where id = :p_id";
    $res = $claseConexion->queryWithParams($sql, array(
        ":p_id" => $usuarioId
    ));

    
    if ($res->rowCount() == 0) {
        return null;
    }
    $row = $res->fetch(PDO::FETCH_ASSOC);
    $obj = $this->rowToDto($row);
    return $obj;
  }


  public function insert($data) {
    $obj = new User();
    $claseConexion = new Conexion();
    $sql = "call sp_user_insert(:_name,:_lastName, :_email, :_password, :_state);";
    try {
        
        $res = $claseConexion->queryWithParams($sql, array(
            ":_name" => $data->name,
            //":p_codigoProyecto" => $objProyecto->generate_string(40) ,
            ":_lastName" => $data->lastName,
            ":_email"=> $data->email,
            ":_password"=> $data->password,
            ":_state" => $data->state
        ));
        $row = $res->fetch(PDO::FETCH_ASSOC);
        $obj = $this->rowToDto($row);
        
        
        return $obj;
    } catch (\PDOException $e) {
        return $e;
    }
  }

  public function update($data) {
    $obj = new User();
    $claseConexion = new Conexion();
    $sql = "call sp_user_update(:_id,:_name,:_lastName,:_email, :_password, :_state);";

    try {
        $res = $claseConexion->queryWithParams($sql, array(
            ":_id" => $data->id,
            ":_name" => $data->name,
            ":_lastName" => $data->lastName,
            ":_email" => $data->email,
            ":_password" =>$data->password,
            ":_state" => $data->state
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
      $obj = new User();
      $obj ->setId($row['id']);
      $obj ->setName($row['name']);
      $obj ->setLastName($row['lastName']);
      $obj ->setEmail($row['email']);
      //$obj ->setPassword($row['password']);
      $obj ->setState($row['state']);

      return $obj;
  }
}
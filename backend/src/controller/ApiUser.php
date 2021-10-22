<?php


namespace API;

include_once "./src/cad/bll/UserBLL.php";
use API\BLL\UserBLL;

class ApiUser
{

    public static function login() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $userBLL = new UserBLL();
        $obj = $userBLL->login($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"Correo o contraseña incorrepta, itente nuevamente."]);
            return;
        }
        
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
    }


    public static function selectAll() {

        $userBLL = new UserBLL();
        $obj = $userBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    public static function selectById($usuarioId) {

        $userBLL = new UserBLL();
        $obj = $userBLL->selectById($usuarioId);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 200, "message"=>"void"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"ok", "data" => $obj]);

    }
    public static function insert() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $userBLL = new UserBLL();
        $obj = $userBLL->insert($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"No se pudo realizar la operacion"]);
            return;
        }
        
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
    }
    public static function update() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $userBLL = new UserBLL();
        $obj = $userBLL->update($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    public static function delete($usuarioId) {
        $userBLL = new UserBLL();
        $obj = $userBLL->delete($usuarioId);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
  
    
}
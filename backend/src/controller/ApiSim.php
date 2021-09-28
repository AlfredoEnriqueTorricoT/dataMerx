<?php


namespace App\controller;


use App\cad\bll\SimBLL;

class ApiSim
{



    public static function selectAll() {
        $simBLL = new SimBLL();
        $obj = $simBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
    }

    public static function selectSimDisponible() {
        $simBLL = new SimBLL();
        $obj = $simBLL->selectAllDisponibles();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
    }

    public static function selectById($usuarioId) {

        $simBLL = new SimBLL();
        $obj = $simBLL->selectById($usuarioId);
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
        $SimBLL = new SimBLL();
        $obj = $SimBLL->insert($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
    }
    public static function update() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $SimBLL = new SimBLL();
        $obj = $SimBLL->update($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    public static function delete($usuarioId) {
        $SimBLL = new SimBLL();
        $obj = $SimBLL->delete($usuarioId);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
  
    
}
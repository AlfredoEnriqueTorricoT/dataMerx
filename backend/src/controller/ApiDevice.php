<?php


namespace API;

include_once "./src/cad/bll/DeviceBLL.php";
use API\BLL\DeviceBLL;




class ApiDevice
{


    public static function selectAll() {
        try{
            $bll = new DeviceBLL();
            $obj = $bll->selectAll();
            header('Content-Type: application/json');
            echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
    }

    public static function selectById() {

        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $bll = new DeviceBLL();
        $obj = $bll->selectById($data->id);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 200, "message"=>"void"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"ok", "data" => $obj]);

    }

    public static function selectAllDisponible() {
        try{
            $bll = new DeviceBLL();
            $obj = $bll->selectAllDisponible();
            header('Content-Type: application/json');
            echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
    }

    public static function retirarSim() {
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);

            $bll = new DeviceBLL();
            $obj = $bll->retirarSim($data);
            header('Content-Type: application/json');
            echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
    }
   

    public static function insert() {
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $bll = new DeviceBLL();
            $obj = $bll->insert($data);
            header('Content-Type: application/json');
            if($obj == null) {
                echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
                return;
            }
            echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
        
    }

    public static function addSimToDevice() {
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $bll = new DeviceBLL();
            $obj = $bll->insertSimToDevice($data);
            header('Content-Type: application/json');
            if($obj == null) {
                echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
                return;
            }
            echo json_encode(["status" => 220, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
        
    }

    public static function update() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $bll = new DeviceBLL();
        $obj = $bll->update($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
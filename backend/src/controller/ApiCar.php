<?php


namespace App\controller;


use App\cad\bll\CarBLL;

class ApiCar
{


    public static function selectAll() {
        try{
            $bll = new CarBLL();
            $obj = $bll->selectAll();
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
            $bll = new CarBLL();
            $obj = $bll->insert($data);
            header('Content-Type: application/json');
            if($obj == null) {
                echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
                return;
            }
            $obj = json_decode($obj);
            if($obj->status == 401) {
                echo json_encode(["status" => $obj->status, "message"=>$obj->message]);
                return;
            }
            echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj->data]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
        
    }

    public static function addDeviceToCar() {
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $bll = new CarBLL();
            $obj = $bll->insertDeviceToCar($data);
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

    public static function retirarCar() {
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $bll = new CarBLL();
            $obj = $bll->retirarDevice($data);
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

    public static function update() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $bll = new CarBLL();
        $obj = $bll->update($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
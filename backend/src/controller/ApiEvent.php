<?php


namespace App\controller;


use App\cad\bll\EventBLL;

class ApiEvent
{


    public static function selectAll() {
        try{
            $bll = new EventBLL();
            $obj = $bll->selectAll();
            header('Content-Type: application/json');
            echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);
        }catch(Exception $e){
            echo json_encode(["status" => 500, "message"=>$e->getMessage()]);
        }
    }

    public static function selectAllByElement() {
        try{
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $bll = new EventBLL();
            $obj = $bll->selectAllByElement($data);
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
            $bll = new EventBLL();
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

    public static function update() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $bll = new EventBLL();
        $obj = $bll->update($data);
        header('Content-Type: application/json');
        if($obj == null) {
            echo json_encode(["status" => 500, "message"=>"no se pudo realizar la operacion"]);
            return;
        }
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
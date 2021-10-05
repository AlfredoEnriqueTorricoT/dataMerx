<?php


namespace App\controller;


use App\cad\bll\TypeEventBLL;

class ApiTypeEvent
{


    public static function selectAll() {

        $bll = new TypeEventBLL();
        $obj = $bll->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
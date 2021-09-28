<?php


namespace App\controller;


use App\cad\bll\PlatformBLL;

class ApiPlatform
{


    public static function selectAll() {

        $userBLL = new PlatformBLL();
        $obj = $userBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
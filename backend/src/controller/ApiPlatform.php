<?php


namespace API;

include_once "./src/cad/bll/PlatformBLL.php";
use API\BLL\PlatformBLL;


class ApiPlatform
{


    public static function selectAll() {

        $userBLL = new PlatformBLL();
        $obj = $userBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
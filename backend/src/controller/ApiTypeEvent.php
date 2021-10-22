<?php


namespace API;

include_once "./src/cad/bll/TypeEventBLL.php";
use API\BLL\TypeEventBLL;


class ApiTypeEvent
{


    public static function selectAll() {

        $bll = new TypeEventBLL();
        $obj = $bll->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
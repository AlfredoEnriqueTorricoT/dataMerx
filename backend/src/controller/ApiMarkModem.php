<?php


namespace App\controller;


use App\cad\bll\MarcaModemBLL;

class ApiMarkModem
{


    public static function selectAll() {

        $userBLL = new MarcaModemBLL();
        $obj = $userBLL->selectAll();
        header('Content-Type: application/json');
        echo json_encode(["status" => 200, "message"=>"se realizo exitosamente la consulta", "data" => $obj]);

    }
    
}
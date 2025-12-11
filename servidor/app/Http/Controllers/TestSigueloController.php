<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TestSigueloController extends Controller
{
    //

    public function index(){
        $myJson = [
            "device_imei" => "12132132131",
            "id" => 12,
            "platform_id" => "6"
        ];

        //$url = "https://demo.siguelo.com/api/aux/dataSiguelo";
        $url = "https://transporte.siguelo.com.bo/api/aux/dataSiguelo";
        
        
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . base64_encode("admin" . ':' . "admin"),
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ]);
    
            dd($response->post($url, $myJson));
        } catch (Exception $ex) {
             dd($ex);
        }



    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Http\Services\HttpSigueloService;
use App\Models\Modem;
use App\Models\Platform;
use Exception;
use Illuminate\Http\Request;

class SigueloController extends Controller
{
    //Auxiliar Resource 700
    public function getDeviceByPlatforms(Request $request){
        $httpSigueloService = new HttpSigueloService();
        
        $platforms = Platform::where("active", 1)->get();

        $data = [
            "texto"=>"getDeviceByImei",
            "text1"=> $request->imei
        ];

        $response = [];
        foreach ($platforms as $platform) {
            try{
                $response[$platform->name] = $httpSigueloService->sendPeticion($platform, '/api/aux/dataSiguelo', $data)["response"];
            }catch(Exception $e){
                $response[$platform->name] = "Error";
            }
        }

        $list = $this->adapterObjectToArray($response);

        return Res::responseSuccess($list);
    }


    public function adapterObjectToArray($object){
        $array = array();
        foreach ($object as $key => $value) {
            //$array[$key] = $value;
            $obj["platform"] = $key;
            
            if(is_array($value) && count($value) > 0){
                $obj["name"] = $value[0]["text1"];
                $obj["date"] = $value[0]["text3"];
            }else{
                $obj["name"] = "";
                $obj["date"] = "";
            }

            array_push($array, $obj);
        }
        return $array;
        
    }

    public function getDevicesCountByPlatforms(Request $request){
        $httpSigueloService = new HttpSigueloService();
        
        $platforms = Platform::where("active", 1)->get();

        $data = [
            "texto"=>"getDevicesByDate",
            "text1"=> $request->fecha
        ];

        $response = [];
        foreach ($platforms as $platform) {
            try{
                $result = $httpSigueloService->sendPeticion($platform, '/api/aux/dataSiguelo', $data);
                
                if(is_array($result["response"]) ){
                    $obj = $result["response"];
                    $obj["id"] = $platform->id;
                    $response[$platform->name] = $obj;
                }
                
            }catch(Exception $e){
                $response[$platform->name] = "Error";
            }
        }

        $list = $this->adapterObjectToArrayCountDevicePlatform($response);

        return Res::responseSuccess($list);
    }

    public function adapterObjectToArrayCountDevicePlatform($object){
        $array = array();
        foreach ($object as $key => $value) {
            //$array[$key] = $value;
            $obj["platform"] = $key;
            
            if(is_array($value) && count($value) > 0){
                $obj["count"] = $value[0]["number1"];
                $obj["id"] = $value["id"];
            }else{
                $obj["count"] = 0;
                $obj["id"] = 0;
            }

            array_push($array, $obj);
        }
        return $array;
        
    }




    public function getImeiByDate(Request $request){
        $httpSigueloService = new HttpSigueloService();
        
        $platform = Platform::findOrFail($request->platform_id);

        $data = [
            "texto"=>"getAllDevices",
            "text1"=> $request->fecha
        ];

        $responses = $httpSigueloService->sendPeticion($platform, '/api/aux/dataSiguelo', $data)["response"];
        
        $listPlatform = array();
        foreach($responses as $device){
            $obj["id"] = $device["id"];
            $obj["name"] = $device["text1"];
            $obj["imei"] = $device["text2"];
            
            array_push($listPlatform, $obj);
        }

        $listDataMerx = Modem::where(Modem::COL_PLATFORM_ID, $request->platform_id)->get(["id", "imei", "code"]);

        
        $newListPlatform = $this->filterUniqueImei($listPlatform, $listDataMerx);
        $newListDataMerx = $this->filterUniqueImei($listDataMerx, $listPlatform);

        return Res::responseSuccess([
            "platforms" => $newListPlatform,
            "dataMerx" => $newListDataMerx
        ]);
    }


    public function filterUniqueImei($listA, $listB) {
        $newList = array();
        foreach ($listA as $platform) {
            $isUnique = true;
            foreach ($listB as $keyDM => $merx) {
                if($platform["imei"] == $merx["imei"]){
                    $isUnique = false;
                    unset($listB[$keyDM]);                 
                }
            } 
            if($isUnique){
                array_push($newList, $platform);
            }
        }

        return $newList;
    }

}

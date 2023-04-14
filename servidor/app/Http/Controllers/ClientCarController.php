<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\ClientCar;
use Exception;
use Illuminate\Http\Request;

class ClientCarController extends Controller
{
    //

    function store(Request $request)
    {
        try {
            $obj = $request->all();

            $count = ClientCar::where([
                ["client_id","=", $obj["client_id"]],
                ["car_id","=", $obj["car_id"]]
            ])->get()->count();

            if($count > 0){
                return Res::responseError432("Ya se ha asignado este dispositivo al cliente",null);
            }

            $obj = ClientCar::create($obj);
            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function destroy(ClientCar $obj)
    {
        try {
            $obj->delete();
            return Res::responseSuccessDelete();
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

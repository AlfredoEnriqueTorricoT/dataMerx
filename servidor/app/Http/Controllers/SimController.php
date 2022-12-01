<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Sim;
use Exception;
use Illuminate\Http\Request;

class SimController extends Controller
{
    //
    public function index()
    {
        try {
            $list = Sim::all();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {
            $obj = Sim::create($request->all());

            $event = [
                "title" => "Registro",
                "detail" => "Sim registrado",
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => null,
                "sim_id" => $obj->id,
                "platform_id" => null,
                "user_id" => auth()->user()->id
            ];
            EventController::_store($event);

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function update(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }

            $obj = Sim::find($request->id);

            if ($obj == null) {
                return Res::responseErrorNoData();
            }
            $obj->fill($request->json()->all());
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (\Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Images;
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

    public function indexSearch($imei)
    {
        try {
            $list = Sim::where("imei", "like", '%' . $imei . '%')->get();

            foreach ($list as $sim) {
                $sim->images = Images::where([
                    ["table", "=", "s"],
                    ["table_id", "=", $sim["id"]],
                ])->get("url");
            }


            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    static public function byId($id){
        try {
            $sim = Sim::find($id);

            if($sim == null){
                return null;
            }

            $sim->images = Images::where([
                ["table", "=", "s"],
                ["table_id", "=", $sim["id"]],
            ])->get("url");


            return $sim;
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }

    }
    public function details($id)
    {
        $sim = SimController::byId($id);
        if($sim == null){
            return Res::responseSuccess([
                "sim" => null,
                "modem" => null,
                "car" => null
            ]);
        }

        $modem = ModemController::bySimId($id);
        $car = null;
        if($modem != null) {
            $car = CarController::byModemId($modem["id"]);
        }

        $obj = [
            "sim" => $sim,
            "modem" => $modem,
            "car" => $car
        ];

        return Res::responseSuccess($obj);
    }



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {

            $countSimRepeat = Sim::where("imei", $request->imei)->get()->count();

            if ($countSimRepeat > 0) {
                return Res::responseError432("Imei ya registrado.", null);
            }

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

    public function storeUpload(Request $request)
    {
        //echo $request->bearerToken();
        try {

            $countSimRepeat = Sim::where("imei", $request->imei)->get()->count();

            if ($countSimRepeat > 0) {
                return Res::responseError432("Imei ya registrado.", null);
            }

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

            ImagesController::upload($request, "s", $obj["id"]);

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
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

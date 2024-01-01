<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Car;
use App\Models\Images;
use App\Models\Modem;
use App\Models\Sim;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;

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

    public function indexSearch($number)
    {
        try {
            $list = Sim::where("number", "like", '%' . $number . '%')
                ->orWhere("imei", "like", '%' . $number . '%')
                ->get();

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

    static public function byId($id)
    {
        try {
            $sim = Sim::find($id);

            if ($sim == null) {
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
        if ($sim == null) {
            return Res::responseSuccess([
                "sim" => null,
                "modem" => null,
                "car" => null
            ]);
        }

        $modem = ModemController::bySimId($id);
        $car = null;
        if ($modem != null) {
            $car = CarController::byModemId($modem["id"]);
            if ($car != null) {
                $car->platform;
            }
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
                "watch_id" => null,
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

            $countImeiRepeat = Sim::where("imei", $request->imei)->get()->count();
            if ($countImeiRepeat > 0) {
                return Res::responseError432("Imei ya registrado.", null);
            }

            $countNumberRepeat = Sim::where("number", $request->number)->get()->count();
            if ($countNumberRepeat > 0) {
                return Res::responseError432("Número ya registrado.", null);
            }
            if (strlen($request->number) != 8) {
                return Res::responseError432("El número de telefono debe tener 8 digitos.", null);
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
            $eventSave = EventController::_store($event);

            ImagesController::upload($request, "e", $eventSave["id"]);

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function updloadImage(Request $request)
    {
        //echo $request->bearerToken();
        try {

            $event = [
                "title" => "Registro",
                "detail" => "Imagenes agregadas",
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => null,
                "sim_id" => $request["id"],
                "platform_id" => null,
                "user_id" => auth()->user()->id
            ];
            $eventSave = EventController::_store($event);


            ImagesController::upload($request, "e", $eventSave["id"]);

            return Res::responseSuccess($event);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function enabled_disable(Request $request)
    {
        try {
            $obj = Sim::find($request->id);
            if(is_null($obj)){
                return Res::responseErrorNoData();
            }

            $event_title = "";
            $event_type = null;
            if ($obj->active) {
                $obj->active = 0;
                $event_title = "Sim dado de baja";
                $event_type = 3;
            } else {
                $obj->active = 1;
                $event_title = "Sim reactivado";
                $event_type = 2;
            }

            $event = [
                "title" => $event_title,
                "detail" => $request->description,
                "type_id" => $event_type,
                "car_id" => null,
                "modem_id" => null,
                "sim_id" => $request->id,
                "platform_id" => null,
                "user_id" => auth()->user()->id
            ];
            EventController::_store($event);


            $obj->save();
            return Res::responseSuccess($obj);

        } catch (Exception $ex) {
            
            Log::error("Error: " . $ex->getMessage() . " ". $ex->getLine());
            return Res::responseError($ex);
        }
    }


    public function event(Request $request)
    {
        $modem_id = null;
        $car_id = null;
        
        $sim_id =  $request->id;

        $modem = Modem::where("sim_id", $sim_id)->first();
        $car = null;
        if ($modem != null) {
            $modem_id = $modem["id"];

            $car = Car::where("modem_id", $modem_id)->first();
            if ($car != null) {
                $car_id = $car["id"];
            }
        }

        $element = [
            "sim_id" => $sim_id,
            "modem_id" => $modem_id,
            "car_id" => $car_id
        ];

        $event = EventController::storeUpload($request, $element);

        return Res::responseSuccess($event);
    }

    public function update(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }

            $obj = Sim::find($request->id);

            if ($obj["imei"] != $request->imei) {
                $countImeiRepeat = Sim::where("imei", $request->imei)->get()->count();
                if ($countImeiRepeat > 0) {
                    return Res::responseError432("Imei ya registrado.", null);
                }
            }

            if ($obj["number"] != $request->number) {
                $countNumberRepeat = Sim::where("number", $request->number)->get()->count();
                if ($countNumberRepeat > 0) {
                    return Res::responseError432("Número ya registrado.", null);
                }
            }

            if (strlen($request->number) != 8) {
                return Res::responseError432("El número de telefono debe tener 8 digitos.", null);
            }

            if ($obj == null) {
                return Res::responseErrorNoData();
            }

            $event = [
                "title" => "Datos del sim modificado",
                "detail" => $obj,
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => null,
                "sim_id" => $obj["id"],
                "platform_id" => $obj->platform_id,
                "user_id" => auth()->user()->id
            ];
            EventController::_store($event);

            $obj->fill($request->json()->all());
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

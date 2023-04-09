<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Car;
use App\Models\Images;
use App\Models\Modem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarController extends Controller
{
    //
    public function index()
    {
        try {
            $list = Car::all();
            foreach ($list as $car) {
                $car["platform"] = $car->platform;
                $car["modem"] = $car->modem;
            }
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function indexSearchPlaca($placa)
    {
        try {
            $list = Car::where("placa", "like", '%' . $placa . '%')->get();

            foreach ($list as $car) {
                $car->images = Images::where([
                    ["table", "=", "c"],
                    ["table_id", "=", $car["id"]],
                ])->get("url");
            }


            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public static function byId($id)
    {
        try {

            $car = Car::find($id);

            if($car == null){
                return null;
            }

            $car->images = Images::where([
                ["table", "=", "c"],
                ["table_id", "=", $car["id"]],
            ])->get("url");



            return $car;
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    static public function byModemId($modemId)
    {
        try {
            $car = Car::where("modem_id", $modemId)->first();

            if($car == null){
                return null;
            }

            $car->images = Images::where([
                ["table", "=", "c"],
                ["table_id", "=", $car["id"]],
            ])->get("url");



            return $car;
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function details($id)
    {
        $car = CarController::byId($id);
        if($car == null){
            return Res::responseSuccess([
                "sim" => null,
                "modem" => null,
                "car" => null
            ]);
        }

        $modem = ModemController::byId($car["modem_id"]);

        $sim = null;
        if($modem != null) {

            $sim = SimController::byId($modem["sim_id"]);
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
        try {
            $request->sim_id = null;
            $obj = Car::create($request->all());

            $event = [
                "title" => "Registro",
                "detail" => "Auto registrado",
                "type_id" => 1,
                "car_id" => $obj->id,
                "modem_id" => null,
                "sim_id" => null,
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
        try {
            $request->sim_id = null;
            $obj = Car::create($request->all());

            $event = [
                "title" => "Registro",
                "detail" => "Auto registrado",
                "type_id" => 1,
                "car_id" => $obj->id,
                "modem_id" => null,
                "sim_id" => null,
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

    public function update_modem(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }
            $obj = null;
            $carWithModemExist = Car::where("modem_id", $request->modem_id)->get()->first();

            if (!empty($carWithModemExist)) {
                $code = $carWithModemExist->modem->code;

                if (!$request->confirm) {
                    $platformName = $carWithModemExist->platform->name;
                    return Res::responseSuccessConfirm("El modem $code ya se encuenta en el auto $carWithModemExist->name de la plataforma $platformName, deseas quitar el modem para agregarlo a este auto,", null);
                } else {
                    DB::update(
                        "update cars set modem_id = null where id = ?;",
                        [$carWithModemExist->id]
                    );
                    $sim = $carWithModemExist->modem->sim;
                    if ($sim == null) {
                        return Res::responseError432("El modem no tiene un sim añadido, debes añadir un sim al modem o buscar otro modem", null);
                    }
                    $event = [
                        "title" => "Retiro del MODEM",
                        "detail" => "Se retiro el modem para añadirlo a otro auto",
                        "type_id" => 1,
                        "car_id" => $carWithModemExist->id,
                        "modem_id" => $request->modem_id,
                        "sim_id" => $sim->id,
                        "platform_id" => $carWithModemExist->platform_id,
                        "user_id" => auth()->user()->id
                    ];
                    EventController::_store($event);
                }
            }


            $obj = Car::find($request->id);
            if ($obj == null) {
                return Res::responseErrorNoData();
            }

            if ($obj->modem_id != null) {
                $event = [
                    "title" => "Retiro del MODEM",
                    "detail" => "Otro sim sera asignado a este modem",
                    "type_id" => 1,
                    "car_id" => $obj->id,
                    "modem_id" => $obj->modem_id,
                    "sim_id" => $obj->modem->sim_id,
                    "platform_id" => $obj->platform_id,
                    "user_id" => auth()->user()->id
                ];
                EventController::_store($event);
            }

            $newData = [
                "modem_id" => $request->modem_id
            ];

            $obj->fill($newData);
            $sim = $obj->modem->sim;
            if ($sim == null) {
                return Res::responseError432("El modem no tiene un sim añadido, debes añadir un sim al modem o buscar otro modem", null);
            }
            $obj->save();

            $event = [
                "title" => "MODEM añadido",
                "detail" => "Se añadio un modem a este auto",
                "type_id" => 1,
                "car_id" => $obj->id,
                "modem_id" => $request->modem_id,
                "sim_id" => $obj->modem->sim_id,
                "platform_id" => $obj->platform_id,
                "user_id" => auth()->user()->id
            ];
            EventController::_store($event);

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }


    public function event(Request $request){
        $modem_id = null;
        $car_id = $request->all()["id"];
        $sim_id =  null;

        $car = Car::find($car_id);

        //$car = null;
        if($car != null){

            $modem = Modem::find($car->modem_id);
            $modem_id = $car->modem_id;
            $car_id = $car["id"];
            if($modem != null){
                $sim_id = $modem->sim_id;
            }


        }

        $element = [
            "sim_id" => $sim_id,
            "modem_id" => $modem_id,
            "car_id" => $car_id
        ];

        $evento = EventController::storeUpload($request, $element);

        return Res::responseSuccess($evento);

    }

    public function update(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }

            $obj = Car::find($request->id);

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

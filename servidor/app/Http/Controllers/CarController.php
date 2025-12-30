<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Car;
use App\Models\Images;
use App\Models\Modem;
use App\Models\Sim;
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
            $list = Car::where(Car::COL_PLACA, "like", '%' . $placa . '%')->get();

            foreach ($list as $car) {
                $car->images = Images::where([
                    ["table", "=", "c"],
                    ["table_id", "=", $car["id"]],
                ])->get("url");
                $car->modem;
            }


            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function indexSearchPlacaForAssign($placa, $client_id)
    {
        try {

            //$list = Car::where("placa", "like", '%' . $placa . '%')->get();
            $sql = "select c.* from (select * from cars where placa like '%$placa%') c
            left join (select * from client_cars where client_id = $client_id) cc on c.id = cc.car_id
            where cc.id is  null;";

            $list = collect(DB::select($sql));

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public static function byId($id)
    {
        try {

            $car = Car::find($id);

            if ($car == null) {
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

            if ($car == null) {
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

        if ($car == null) {
            return Res::responseSuccess([
                "sim" => null,
                "modem" => null,
                "car" => null
            ]);
        }
        $car->platform;
        $modem = ModemController::byId($car["modem_id"]);

        $sim = null;
        if ($modem != null) {
            $modem->modems_mark;
            $sim = SimController::byId($modem["sim_id"]);
        }

        $obj = [
            "sim" => $sim,
            "modem" => $modem,
            "car" => $car
        ];

        return Res::responseSuccess($obj);
    }

    public function remove_modem($modem_id)
    {
        $obj = Car::find($modem_id);

        if ($obj->modem_id == null) {
            return Res::responseError432("No se ha encontrado modem en el auto", $obj);
        }


        $elements = $this->getElements($obj);
        $event = [
            "title" => "Modem retirado del auto",
            "detail" => "El modem {$elements['modem']['imei']} se ha retirado del auto $obj->placa",
            "type_id" => 1,
            "car_id" => $obj->id,
            "modem_id" => $elements["modem"]["id"],
            "sim_id" => $elements["sim"]["id"],
            "platform_id" => null,
            "user_id" => auth()->user()->id
        ];
        EventController::_store($event);


        $obj->modem_id = null;
        $obj->save();





        return Res::responseSuccess($obj);
    }

    public function getElements($car)
    {
        $modem = Modem::find($car->modem_id);
        $modem_id = null;
        $modem_imei = null;
        $sim_id = null;
        $sim_number = null;
        if ($modem != null) {
            $modem_id = $modem->id;
            $modem_imei = $modem->imei;
            if ($modem->sim_id != null) {
                $sim = Sim::find($modem->sim_id);
                $sim_id = $sim->id;
                $sim_number = $sim->number;
            }
        }

        return [
            "modem" => [
                "id" => $modem_id,
                "imei" => $modem_imei
            ],
            "sim" => [
                "id" => $sim_id,
                "number" => $sim_number
            ]
        ];
    }

    public function store(Request $request)
    {
        try {
            $request->sim_id = null;
            $obj = Car::create($request->all());


            $countPlacaRepeat = Car::where("placa", $request->placa)->get()->count();
            if ($countPlacaRepeat > 0) {
                return Res::responseError432("La placa ya esta registrada.", null);
            }

            if (!$this->isPlacaSuccess($request->placa)) {
                return Res::responseError432("El número de la placa es incorrecto.", null);
            }


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

            $countPlacaRepeat = Car::where("placa", $request->placa)->get()->count();
            if ($countPlacaRepeat > 0) {
                return Res::responseError432("La placa ya esta registrada.", null);
            }

            if (!$this->isPlacaSuccess($request->placa)) {
                return Res::responseError432("El número de la placa es invalido.", null);
            }

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


    public function updloadImage(Request $request)
    {
        //echo $request->bearerToken();
        try {

            $event = [
                "title" => "Registro",
                "detail" => "Imagenes agregadas",
                "type_id" => 1,
                "car_id" => $request["id"],
                "modem_id" => null,
                "sim_id" => null,
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
                "modem_id" => $request->modem_id,
                "name" => $request->name
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


    public function event(Request $request)
    {
        $modem_id = null;
        $car_id = $request->all()["id"];
        $sim_id =  null;

        $car = Car::find($car_id);
        //$car = null;
        if ($car != null) {

            $modem = Modem::find($car->modem_id);
            $modem_id = $car->modem_id;
            $car_id = $car["id"];
            if ($modem != null) {
                $sim_id = $modem->sim_id;
            }
        }

        $element = [
            "sim_id" => $sim_id,
            "modem_id" => $modem_id,
            "car_id" => $car_id,
            "watch_id" => null,
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

            if ($obj["placa"] != $request->placa) {
                $countPlacaRepeat = Car::where("placa", $request->placa)->get()->count();
                if ($countPlacaRepeat > 0) {
                    return Res::responseError432("La placa ya esta registrada.", null);
                }
            }


            if (!$this->isPlacaSuccess($request->placa)) {
                return Res::responseError432("El número de la placa es invalido.", null);
            }

            if ($obj == null) {
                return Res::responseErrorNoData();
            }

            $event = [
                "title" => "Datos del autos modificado",
                "detail" => $obj,
                "type_id" => 1,
                "car_id" => $obj["id"],
                "modem_id" => null,
                "sim_id" => null,
                "platform_id" => $obj->platform_id,
                "user_id" => auth()->user()->id
            ];
            EventController::_store($event);

            $obj->fill($request->json()->all());
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (\Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }


    function isPlacaSuccess($placa)
    {
        $patron = "/^[0-9]{3,4}-[A-Z]{3}$/";
        return preg_match($patron, $placa);
    }
}

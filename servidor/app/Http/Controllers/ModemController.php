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

use function PHPUnit\Framework\isEmpty;

class ModemController extends Controller
{
    //
    //
    public function index()
    {
        try {
            $list = Modem::all();
            
            foreach ($list as $moden) {
                $moden["platform"] = $moden->platform;
                $moden["sim"] = $moden->sim;
                $moden["modems_mark"] = $moden->modems_mark;
            }
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function indexSearch($imei)
    {
        try {
            $list = Modem::where("imei", "like", '%' . $imei . '%')->get();

            foreach ($list as $modem) {
                $modem->images = Images::where([
                    ["table", "=", "m"],
                    ["table_id", "=", $modem["id"]],
                ])->get("url");
                $modem->sim;
                $modem->modems_mark;
                $modem->platform;
            }


            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public static function byId($id)
    {
        try {
            $modem = Modem::find($id);

            if($modem == null){
                return null;
            }

            $modem->images = Images::where([
                ["table", "=", "m"],
                ["table_id", "=", $modem["id"]],
            ])->get("url");


            return $modem;
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }


    static function bySimId($simId)
    {
        try {
            $modem = Modem::where("sim_id", $simId)->first();

            if($modem == null){
                return null;
            }
            $modem->modems_mark;
            $modem->platform;
            $modem->images = Images::where([
                ["table", "=", "m"],
                ["table_id", "=", $modem["id"]],
            ])->get("url");



            return $modem;
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function details($id)
    {

        $modem = ModemController::byId($id);
        if ($modem == null) {
            return Res::responseSuccess([
                "sim" => null,
                "modem" => null,
                "car" => null
            ]);
        }
        $modem->modems_mark;
        $sim = SimController::byId($modem["sim_id"]);
        $car = CarController::byModemId($modem["id"]);
        if($car != null){
            $car->platform;
        }

        $obj = [
            "sim" => $sim,
            "modem" => $modem,
            "car" => $car
        ];

        return Res::responseSuccess($obj);
    }

    public function remove_sim ($modem_id){
        $obj = Modem::find($modem_id);
        $sim_id = $obj->sim_id;

        if($sim_id == null){
            return Res::responseError432("No se ha encontrado sim en el modem", $obj);
        }

        $sim = Sim::find($sim_id);

        $obj->sim_id = null;
        $obj->save();

        $car = Car::where("modem_id", $obj->id)->first();
        $car_id = null;
        if($car != null){
            $car_id = $car->id;
        }
        $event = [
            "title" => "Sim retirado del modem",
            "detail" => "El sim $sim->number se ha retirado del modem $obj->imei",
            "type_id" => 1,
            "car_id" => $car_id,
            "modem_id" => $obj->id,
            "sim_id" => $sim_id,
            "platform_id" => null,
            "user_id" => auth()->user()->id
        ];
        EventController::_store($event);

        return Res::responseSuccess($obj);
    }


    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {

            $countModemRepeat = Modem::where("imei", $request->imei)->get()->count();

            if ($countModemRepeat > 0) {
                return Res::responseError432("Imei ya registrado.", null);
            }

            $request->sim_id = null;
            $obj = Modem::create($request->all());

            $event = [
                "title" => "Registro",
                "detail" => "Modem registrado",
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => $obj->id,
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
        //echo $request->bearerToken();
        try {

            $countModemRepeat = Modem::where("imei", $request->imei)->get()->count();
            if ($countModemRepeat > 0) {
                return Res::responseError432("Imei ya registrado.", null);
            }

            if (strlen($request->imei) != 15) {
                return Res::responseError432("El imei debe tener 15 digitos.", null);
            }

            $request->sim_id = null;
            $obj = Modem::create($request->all());

            $event = [
                "title" => "Registro",
                "detail" => "Modem registrado",
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => $obj->id,
                "sim_id" => null,
                "platform_id" => null,
                "user_id" => auth()->user()->id
            ];
            $eventSave =EventController::_store($event);

            
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
                "modem_id" => $request["id"],
                "sim_id" => null,
                "platform_id" => null,
                "user_id" => auth()->user()->id
            ];
            $eventSave =EventController::_store($event);

            
            ImagesController::upload($request, "e", $eventSave["id"]);

            return Res::responseSuccess($event);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function enabled_disable(Request $request)
    {
        try {
            
            $obj = Modem::find($request->id);
            if(is_null($obj)){
                return Res::responseErrorNoData();
            }
            $event_title = "";
            $event_type = null;

            if ($obj->active) {
                $obj->active = 0;
                $event_title = "Modem dado de baja.";
                $event_type = 3;
            } else {
                $obj->active = 1;
                $event_title = "Modem reactivado";
                $event_type = 2;
            }

            $event = [
                "title" => $event_title,
                "detail" => $request->description,
                "type_id" => $event_type,
                "car_id" => null,
                "modem_id" => $request->id,
                "sim_id" => null,
                "platform_id" => null,
                "user_id" => auth()->user()->id
            ];
            EventController::_store($event);


            $obj->save();
            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function event(Request $request){
        $modem_id = $request["id"];
        $car_id = null;
        $sim_id =  null;

        $modem = Modem::find($modem_id);

        $car = null;
        if($modem != null){
            $modem_id = $modem["id"];
            $sim_id = $modem["sim_id"];

            $car = Car::where("modem_id", $modem_id)->first();
            if($car != null){
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

    public function update_sim(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }
            $obj = null;
            $modemWithSimExist = Modem::where("sim_id", $request->sim_id)->get()->first();

            if (!empty($modemWithSimExist)) {
                $number = $modemWithSimExist->sim->number;
                if (!$request->confirm) {
                    return Res::responseSuccessConfirm("El sim $number ya se encuenta en el modem $modemWithSimExist->code, deseas quitarlo para agregarlo a este modem,", null);
                } else {

                    DB::update(
                        "update modems set sim_id = null where id = ?;",
                        [$modemWithSimExist->id]
                    );

                    $event = [
                        "title" => "Retiro de SIM",
                        "detail" => "Se retiro el sim para añadirlo a otro modem",
                        "type_id" => 1,
                        "car_id" => null,
                        "modem_id" => $modemWithSimExist->id,
                        "sim_id" => $request->sim_id,
                        "platform_id" => $modemWithSimExist->platform_id,
                        "user_id" => auth()->user()->id
                    ];
                    EventController::_store($event);
                }
            }



            $obj = Modem::find($request->id);
            if ($obj == null) {
                return Res::responseErrorNoData();
            }

            if ($obj->sim_id != null) {
                $event = [
                    "title" => "Retiro de SIM",
                    "detail" => "Otro sim sera asignado a este modem",
                    "type_id" => 1,
                    "car_id" => null,
                    "modem_id" => $obj->id,
                    "sim_id" => $obj->sim_id,
                    "platform_id" => $obj->platform_id,
                    "user_id" => auth()->user()->id
                ];
                EventController::_store($event);
            }

            $newData = [
                "sim_id" => $request->sim_id
            ];

            $obj->fill($newData);
            $obj->save();
            $number = $obj->sim->number;

            $event = [
                "title" => "SIM añadido",
                "detail" => "Se añadio un nuevo sim a este modem",
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => $request->id,
                "sim_id" => $request->sim_id,
                "platform_id" => $obj->platform_id,
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

            $obj = Modem::find($request->id);

            if ($obj["imei"] != $request->imei) {
                $countImeiRepeat = Modem::where("imei", $request->imei)->get()->count();
                if ($countImeiRepeat > 0) {
                    return Res::responseError432("El imei ya esta registrada.", null);
                }
            }
            if (strlen($request->imei) != 15) {
                return Res::responseError432("El imei debe tener 15 digitos.", null);
            }

            if ($obj == null) {
                return Res::responseErrorNoData();
            }

            $event = [
                "title" => "Datos del modem modificado",
                "detail" => $obj,
                "type_id" => 1,
                "car_id" => null,
                "modem_id" => $obj["id"],
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
}

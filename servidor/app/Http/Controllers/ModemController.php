<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Modem;
use Exception;
use Illuminate\Http\Request;

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



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {
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

    public function update_sim(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }
            $obj = null;
            $modemWithSimExist = Modem::where("sim_id", $request->sim_id)->get()->first();

            if (!empty($modemWithSimExist)) {
                if (!$request->confirm) {
                    $number = $modemWithSimExist->sim->number;
                    return Res::responseSuccessConfirm("El sim $number ya se encuenta en el modem $modemWithSimExist->code, deseas quitarlo para agregarlo a este modem,", null);
                } else {
                    $modemWithSimExist = Modem::find($request->id);
                    $newData = [
                        "sim_id" => null
                    ];

                    $number = $modemWithSimExist->sim->number;

                    $modemWithSimExist->fill($newData);
                    $modemWithSimExist->save();

                    $event = [
                        "title" => "Retiro del sim",
                        "detail" => "Se retiro el sim $number para añadirlo al modem  $modemWithSimExist->code",
                        "type_id" => 1,
                        "car_id" => null,
                        "modem_id" => $obj->id,
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
            $newData = [
                "sim_id" => $request->sim_id
            ];

            $obj->fill($newData);
            $obj->save();

            $number = $obj->sim->number;

            $event = [
                "title" => "Sim añadido al modem",
                "detail" => "Se añadio el sim $number al modem $obj->code",
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

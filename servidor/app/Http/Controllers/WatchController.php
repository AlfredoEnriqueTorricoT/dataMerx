<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Modem;
use App\Models\Watch;
use App\Models\Wifi;
use App\Services\ModemServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WatchController extends Controller
{
    //
    public function index($imei)
    {
        try {
            $list = Watch::where(Watch::COL_IMEI, 'like', '%' . $imei . '%')->get();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function get_wifi(Watch $watch){
        try {
            if($watch->modem_id == null){
                return Res::responseError432("Modem no encontrado",null);
            }
            $modem = Modem::find($watch->modem_id);
            if($modem->platform_id == null){
                return Res::responseError432("Plataforma no encontrada",null);
            }

            $list = Wifi::where(Wifi::COL_PLATFORM_ID, $modem->platform_id)->get();

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request, ModemServices $modemServices)
    {
        //echo $request->bearerToken();
        try {
            $modem = $modemServices->_searchByImei($request->modem_imei);
            if($modem == null){
                return Res::responseError("Modem no encontrado");
            }

            $request->merge([
                "modem_id" => $modem->id
            ]);

            $obj = Watch::create($request->all());

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function update(Request $request, ModemServices $modemServices)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }

            $obj = Watch::find($request->id);

            if ($obj == null) {
                return Res::responseErrorNoData();
            }
            $request->merge([
                "modem_id" => $modemServices->_searchByImei($request->modem_imei)->id
            ]);
            $obj->fill($request->all());
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (\Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

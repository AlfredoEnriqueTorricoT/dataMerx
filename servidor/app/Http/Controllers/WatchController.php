<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Modem;
use App\Models\Platform;
use App\Models\Watch;
use App\Models\Wifi;
use App\Services\HttpSiguelo;
use App\Services\ModemServices;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class WatchController extends Controller
{
    public function getConfigByCode($code)
    {
        $watch = Watch::where(Watch::COL_CODE, $code)->first();
        if(!isEmpty($watch)){
            Res::responseError("No se encontro el reloj");
        }
        $watch->url = null;
        $watch->credencial = null;
        if ($watch[Watch::COL_PLATFORM_ID]) {
            $wifi = Wifi::where(Wifi::COL_PLATFORM_ID, $watch->platform_id)->get([
                Wifi::COL_SSID,
                Wifi::COL_PASSWORD,
            ]);
            $watch->wifi = $wifi;
            $watch->wifi_count = count($wifi);

            $platform = Platform::find($watch[Watch::COL_PLATFORM_ID]);

            $splitPlatformUrl = explode("//", $platform->url);
            
            $watch->protocol = $splitPlatformUrl[0];
            $watch->url = $splitPlatformUrl[1];
            $watch->credencial = $platform->credencial;
        }

        
        $watch = $watch->only(['device_name', 'siguelo_device_id', 'url', 'credencial', 'protocol', 'wifi', 'wifi_count']);
        return Res::responseSuccess($watch);
    }

    public function getDataConfigForWatch(Request $request)
    {

        $httpSiguelo = new HttpSiguelo();
        $data = [
            "texto" => "getDeviceByImei",
            "text1" => $request->device_imei,
        ];

        $watch = Watch::find($request->id);
        $platform = Platform::find($request->platform_id);

        $peticion = $httpSiguelo->sendPeticion($platform, "/api/aux/dataSiguelo", $data);

        if ($peticion["status"] == "success") {
            $count = count($peticion["response"]);

            if ($count > 0) {
                //echo $peticion["response"][0]["id"]. " -> ". $peticion["response"][0]["text1"];
                $watch->update([
                    Watch::COL_PLATFORM_ID => $request->platform_id,
                    Watch::COL_SIGUELO_DEVICE_ID => $peticion["response"][0]["id"],
                    Watch::COL_DEVICE_NAME => $peticion["response"][0]["text1"],
                ]);
                $watch->save();
                return Res::responseSuccess($watch);
            } else {
                return Res::responseError432("No se encontro el dispositivo en la plataform $platform->url.", null);
            }
        } else {
            $__status = $peticion['status'];
            return Res::responseError432("Error en la petición con estado $__status.", $peticion);
        }

        return Res::responseSuccess($peticion);
        /*
        $wath->update([
            Watch::COL_SIGUELO_DEVICE_ID => $data["response"]["id"],
            Watch::COL_DEVICE_NAME => $data["response"]["text1"],
        ]);*/

        //return Res::responseSuccess($response);
    }
    //
    public function index($imei)
    {
        try {
            $list = Watch::where(Watch::COL_IMEI, 'like', '%' . $imei . '%')->get();
            foreach ($list as $watch) {
                if (isset($watch->platform_id)) {
                    $platform = Platform::findOrFail($watch->platform_id);
                    $watch->platform_name = $platform->name;
                }
            }
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function event(Request $request)
    {
        $element = [
            "watch_id" => $request->watch_id,
            "sim_id" => null,
            "modem_id" => null,
            "car_id" => null
        ];

        $event = EventController::storeUpload($request, $element);

        return Res::responseSuccess($event);
    }

    public function get_wifi(Watch $watch)
    {
        try {
            if ($watch->modem_id == null) {
                return Res::responseError432("Modem no encontrado", null);
            }
            $modem = Modem::find($watch->modem_id);
            if ($modem->platform_id == null) {
                return Res::responseError432("Plataforma no encontrada", null);
            }

            $list = Wifi::where(Wifi::COL_PLATFORM_ID, $modem->platform_id)->get();

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {
            $obj = Watch::create($request->all());


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

            $obj = Watch::find($request->id);

            if ($obj == null) {
                return Res::responseErrorNoData();
            }

            $obj->fill($request->all());
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (\Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function destroy(Watch $watch)
    {
        $watch->delete();
        return Res::responseSuccess($watch);
    }
}

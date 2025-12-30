<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Car;
use App\Models\Event;
use App\Models\Images;
use App\Models\Modem;
use App\Models\Platform;
use Exception;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\AssignOp\Mod;

class EventController extends Controller
{
    public function index($type, $id)
    {
        try {

            $list = Event::where($type."_id", $id)->get();

            foreach($list as $event){
                $event["platform"] = $event->platform;
                $event["car"] = $event->car;
                $event["modem"] = $event->modem;
                $event["sim"] = $event->sim;

                /*
                $event["images"] = Images::where([
                    ["table", "=", "e"],
                    ["table_id", "=", $event->id]
                ])->get("url");*/
            }

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }




    public function car($id)
    {
        try {
            $list = Event::where("car_id", $id)
                ->with(['user', 'car', 'modem', 'sim', 'watch', 'platform', 'images', 'comments'])
                ->orderBy("created_at", "desc")
                ->get();

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function modem($id)
    {
        try {
            $list = Event::where("modem_id", $id)
                ->with(['user', 'car', 'modem', 'sim', 'watch', 'platform', 'images', 'comments'])
                ->orderBy("created_at", "desc")
                ->get();

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function sim($id)
    {
        try {
            $list = Event::where("sim_id", $id)
                ->with(['user', 'car', 'modem', 'sim', 'watch', 'platform', 'images', 'comments'])
                ->orderBy("created_at", "desc")
                ->get();

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }


    public function watch($id)
    {
        try {
            $list = Event::where("watch_id", $id)->orderBy("id","desc")->get();

            foreach($list as $event){
                $event["platform"] = $event->platform;
                $event["car"] = $event->car;
                $event["modem"] = $event->modem;
                $event["sim"] = $event->sim;
                $event["images"] = Images::where([
                    ["table", "=", "e"],
                    ["table_id", "=", $event->id]
                ])->get("url");
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

            $obj = Event::create($request->all());

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public static function storeUpload(Request $request, $objId)
    {
        //echo $request->bearerToken();
        try {

            $obj = Event::create([
                "title" => $request["title"],
                "detail" => $request["detail"],
                "type_id" => $request["type_id"],
                "car_id" => $objId["car_id"],
                "modem_id" => $objId["modem_id"],
                "sim_id" => $objId["sim_id"],
                "watch_id" => $objId["watch_id"],
            ]);

            ImagesController::upload($request, "e", $obj["id"]);

            return $obj;
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }


    static public function _store($data)
    {
        try {
            $obj = Event::create($data);

            return $obj;
        } catch (Exception $ex) {
            echo $ex;
            return Res::responseError($ex->getMessage());
        }
    }



    public function images($id) {

        $obj = Images::where([
            ["table", "=", "e"],
            ["table_id", "=", $id]
        ])->get("url");

        return Res::responseSuccess($obj);
    }


    public function update(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }

            $obj = Event::find($request->id);

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



    public function eventServerSiguelo(Request $request){
        $modem = Modem::where("imei", $request->imei)->first();

        $path = explode("," ,$request->platform)[2];
        $platform = Platform::where("url", "like","%".$path)->first();

        if($platform){
            $modem[Modem::COL_PLATFORM_ID] = $platform->id;
            $modem->save();

            Event::create([
                Event::COL_MODEM_ID => $modem->id,
                Event::COL_TITLE => "Modem reasignación de plataforma",
                Event::COL_DETAIL => "Se traspaso el modem a la plataform ".$platform->name,
                Event::COL_TYPE_ID => 1,
            ]);
        }

        return $platform;
    }
}

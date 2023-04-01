<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Car;
use App\Models\Event;
use Exception;
use Illuminate\Http\Request;

class EventController extends Controller
{
    //
    public function index()
    {
        try {
            $list = Event::all();

            foreach($list as $event){
                $event["platform"] = $event->platform;
                $event["car"] = $event->car;
                $event["modem"] = $event->modem;
                $event["sim"] = $event->sim;
            }

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function car($id)
    {
        try {
            $list = Event::where("car_id", $id)->get();

            foreach($list as $event){
                $event["platform"] = $event->platform;
                $event["car"] = $event->car;
                $event["modem"] = $event->modem;
                $event["sim"] = $event->sim;
            }

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function modem($id)
    {
        try {
            $list = Event::where("modem_id", $id)->get();

            foreach($list as $event){
                $event["platform"] = $event->platform;
                $event["car"] = $event->car;
                $event["modem"] = $event->modem;
                $event["sim"] = $event->sim;
            }

            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function sim($id)
    {
        try {
            $list = Event::where("sim_id", $id)->get();

            foreach($list as $event){
                $event["platform"] = $event->platform;
                $event["car"] = $event->car;
                $event["modem"] = $event->modem;
                $event["sim"] = $event->sim;
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
                "title" => $request->all()["title"],
                "detail" => $request->all()["detail"],
                "type_id" => $request->all()["type_id"],
                "car_id" => $objId["car_id"],
                "modem_id" => $objId["modem_id"],
                "sim_id" => $objId["sim_id"]
            ]);

            ImagesController::upload($request, "e", $obj["id"]);

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }


    static public function _store($data)
    {
        try {
            Event::create($data);

            //return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            echo $ex;
            return Res::responseError($ex->getMessage());
        }
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
}

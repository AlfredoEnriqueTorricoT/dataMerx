<?php

namespace App\Http\Controllers;


use App\Http\Res;
use App\Models\Client;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    //

    public function indexSearch($ci)
    {
        try {
            $list = Client::where("ci", "like", '%' . $ci . '%')->get();

            $sql = "select c.*, cc.id as client_car from (SELECT * FROM client_cars where client_id = ?) cc
            join cars c on cc.car_id = c.id;";

            foreach($list as $client){
                $client["cars"] = collect(DB::select($sql, [$client["id"]]))->all();
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

            $client = Client::where("ci", $request->ci)->first();

            if ($client != null) {
                return Res::responseError432("CI ya registrado.", null);
            }

            $obj = Client::create($request->all());


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

            $obj = Client::find($request->id);

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

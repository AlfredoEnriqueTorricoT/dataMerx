<?php

namespace App\Http\Controllers;

use App\Http\Res;
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

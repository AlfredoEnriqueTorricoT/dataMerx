<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Wifi;
use Exception;
use Illuminate\Http\Request;

class WifiController extends Controller
{
    //
    public function index()
    {
        try {
            $list = Wifi::all();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        try {
            $obj = Wifi::create($request->all());

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

            $obj = Wifi::find($request->id);

            if ($obj == null) {
                return Res::responseErrorNoData();
            }
            $obj->fill($request->all());
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function destroy(Wifi $obj)
    {
        try {
            $obj->delete();
            return Res::responseSuccessDelete();
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

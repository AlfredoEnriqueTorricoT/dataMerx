<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Modem;
use Exception;
use Illuminate\Http\Request;

class ModemController extends Controller
{
    //
    //
    public function index()
    {
        try {
            $list = Modem::all();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {
            $obj = Modem::create($request->all());

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

            $obj = Modem::find($request->id);

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

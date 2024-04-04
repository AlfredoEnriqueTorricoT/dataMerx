<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Platform;
use App\Models\Wifi;
use Exception;
use Illuminate\Http\Request;

class WifiController extends Controller
{
    //
    public function index($platform_id)
    {
        try {
            $list = Wifi::where(Wifi::COL_PLATFORM_ID, $platform_id)->get();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        try {
            $request->validate([
                'ssid' => 'required',
                'password' => 'required',
                'platform_id' => 'required'
            ]);
            
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

    public function destroy(Wifi $wifi)
    {
        try {
            $wifi->delete();
        
            return Res::responseSuccessDelete();
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

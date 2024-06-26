<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Platform;
use App\Models\Wifi;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlatformController extends Controller
{
    //
    public function index()
    {
        try {
            $list = Platform::all();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function countDevice(){
        $sql = "SELECT p.name, m_c.count from (SELECT platform_id, COUNT(platform_id) as count  FROM `modems` GROUP by platform_id) m_c
        join platforms p on p.id = m_c.platform_id;";
        $count = DB::select($sql);
        return Res::responseSuccess($count);
    }

    public function getWifi($platform_id)
    {
        try {
            $list = Wifi::where(Wifi::COL_PLATFORM_ID, $platform_id)->get();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function storeWifi(Request $request, Platform $platform){
        try {
            $request->validate([
                'ssid' => 'required',
                'password' => 'required',
            ]);

            $request->merge([
                "platform_id" => $platform->id
            ]);
            
            $obj = Wifi::create($request->all());
            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {
            $obj = Platform::create($request->all());

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

            $obj = Platform::find($request->id);

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
}

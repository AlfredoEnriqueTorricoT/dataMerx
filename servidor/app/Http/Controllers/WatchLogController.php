<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Watch;
use App\Models\WatchLog;
use Illuminate\Http\Request;

class WatchLogController extends Controller
{
    //

    public function index($macAddress){
        $list = WatchLog::where(WatchLog::COL_MAC_ADDRESS, "like", "%".$macAddress."%")->get();
        $list->pluck("name");
        return Res::responseSuccess($list);
    }

    public function store($macAddress){
        $watch = Watch::where( Watch::COL_IMEI , $macAddress )->first();

        $watchLog = WatchLog::create([
            WatchLog::COL_MAC_ADDRESS => $macAddress,
            WatchLog::COL_WATCH_ID => null,
            WatchLog::COL_WATCH_ID => $watch->id && null
        ]);

        return Res::responseSuccess($watchLog);
    }
}

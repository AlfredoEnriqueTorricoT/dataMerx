<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\WatchLog;
use Illuminate\Http\Request;

class WatchLogController extends Controller
{
    //

    public function index($macAddress){
        $list = WatchLog::where(WatchLog::COL_MAC_ADDRESS, "like", "%".$macAddress."%")->get();
        return Res::responseSuccess($list);
    }

    public function store($macAddress){
        $watchLog = WatchLog::create([
            WatchLog::COL_MAC_ADDRESS => $macAddress,
            WatchLog::COL_WATCH_ID => null
        ]);

        return Res::responseSuccess($watchLog);
    }
}

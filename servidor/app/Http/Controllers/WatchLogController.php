<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Watch;
use App\Models\WatchLog;
use Illuminate\Http\Request;

class WatchLogController extends Controller
{
    //

    public function index() {
        $list = WatchLog::limit(20)
            ->addSelect(['watch_code' => Watch::select('code')
                ->whereColumn('id', 'watch_logs.watch_id')
                ->limit(1)
            ])
            ->orderBy('id', 'desc')
            ->get();

        return Res::responseSuccess($list);
    }

    public function store($macAddress){
        $watch = Watch::where( Watch::COL_IMEI , $macAddress )->first();

        $watchLog = WatchLog::create([
            WatchLog::COL_MAC_ADDRESS => $macAddress,
            WatchLog::COL_WATCH_ID => $watch?->id
        ]);

        return Res::responseSuccess($watchLog);
    }
}

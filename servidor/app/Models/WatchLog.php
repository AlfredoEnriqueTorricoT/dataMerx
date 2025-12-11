<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchLog extends Model
{
    use HasFactory;

    const COL_MAC_ADDRESS = "mac_address";
    const COL_WATCH_ID = "watch_id";


    public $fillable = [
        self::COL_MAC_ADDRESS,
        self::COL_WATCH_ID
    ];

    // name watch
    public function watch()
    {
        return $this->hasOne(Watch::class);
    }
}

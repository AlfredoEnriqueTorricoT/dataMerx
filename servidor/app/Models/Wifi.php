<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wifi extends Model
{
    use HasFactory;
    public $timestamps = false;

    const COL_ID = "id";
    const COL_SSID = "ssid";
    const COL_PASSWORD = "password";
    const COL_PLATFORM_ID = "platform_id";

    protected $fillable = [
        self::COL_SSID,
        self::COL_PASSWORD,
        self::COL_PLATFORM_ID,
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watch extends Model
{
    use HasFactory;

    const COL_ID = 'id';
    const COL_CODE = 'code';
    const COL_IMEI = 'imei';
    const COL_DEVICE_NAME = 'device_name';
    const COL_SIGUELO_DEVICE_ID = 'siguelo_device_id';
    const COL_PLATFORM_ID = 'platform_id';

    public $fillable = [
        self::COL_IMEI,
        self::COL_CODE,
        self::COL_DEVICE_NAME,
        self::COL_SIGUELO_DEVICE_ID,
        self::COL_PLATFORM_ID
    ];
}

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
    const COL_IS_PENDING = 'is_pending';
    const COL_RESPONSABILITY_ID = "responsability_id";
    const COL_USER_RESPONSABILITY_ID = 'user_responsability_id';
    const COL_USER_SECCESSOR_ID = 'user_successor_id';

    public $fillable = [
        self::COL_IMEI,
        self::COL_CODE,
        self::COL_DEVICE_NAME,
        self::COL_SIGUELO_DEVICE_ID,
        self::COL_PLATFORM_ID,
        self::COL_IS_PENDING,
        self::COL_RESPONSABILITY_ID,
        self::COL_USER_RESPONSABILITY_ID,
        self::COL_USER_SECCESSOR_ID,
    ];
}

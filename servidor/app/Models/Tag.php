<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{

    use HasFactory;
    const COL_NAME = "name";
    const COL_DETAIL = "detail";
    const COL_ACTIVE = "active";
    const COL_DEVICE = "device";

    const DEVICE_MODEM = "modem";
    const DEVICE_WATCH = "watch";


    public $fillable = [
        self::COL_NAME,
        self::COL_DETAIL,
        self::COL_ACTIVE,
        self::COL_DEVICE,
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watch extends Model
{
    use HasFactory;

    const COL_ID = 'id';
    const COL_IMEI = 'imei';
    const COL_MODEM_ID = 'modem_id';

    public $fillable = [
        self::COL_IMEI,
        self::COL_MODEM_ID,
    ];
}

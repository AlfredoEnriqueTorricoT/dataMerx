<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modem extends Model
{
    use HasFactory;

    protected $fillable = [
        "code",
        "imei",
        "reception",
        "active",
        "sim_id",
        "mark_id",
        "platform_id"
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "detail",
        "type_id",
        "car_id",
        "modem_id",
        "sim_id",
        "platform_id",
        "user_id"
    ];


}

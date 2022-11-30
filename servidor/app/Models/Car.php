<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "mark",
        "model",
        "placa",
        "date_start",
        "date_end",
        "modem_id",
        "platform_id"
    ];
}

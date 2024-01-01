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
        "watch_id",
        "platform_id",
        "user_id"
    ];

    public function car()
    {
        return $this->hasOne(Car::class, "id", "car_id");
    }

    public function modem()
    {
        return $this->hasOne(Modem::class, "id", "modem_id");
    }

    public function sim()
    {
        return $this->hasOne(Sim::class, "id", "sim_id");
    }

    public function platform()
    {
        return $this->hasOne(Platform::class, "id", "platform_id");
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modem extends Model
{
    use HasFactory;

    protected $hidden = ["created_at", "updated_at"];

    protected $fillable = [
        "code",
        "imei",
        "reception",
        "active",
        "sim_id",
        "mark_id",
        "platform_id"
    ];


    public function platform(){
        return $this->hasOne(Platform::class, "id", "platform_id");
    }

    public function sim(){
        return $this->hasOne(Sim::class, "id", "sim_id");
    }

    public function modems_mark(){
        return $this->hasOne(ModemsMark::class, "id", "mark_id");
    }
}

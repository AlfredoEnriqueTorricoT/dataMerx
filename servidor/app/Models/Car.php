<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $hidden = ["created_at", "updated_at"];

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

    public function platform(){
        return $this->hasOne(Platform::class, "id", "platform_id");
    }

    public function modem(){
        return $this->hasOne(Modem::class, "id", "modem_id");
    }

    public function __toString()
    {
        $cadena = '';
        foreach ($this->fillable as $propiedad) {
            $cadena .= $this->{$propiedad} . ', ';
        }
        return rtrim($cadena, ', ');
    }
}

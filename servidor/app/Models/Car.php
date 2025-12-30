<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $hidden = ["created_at", "updated_at"];

    const COL_NAME = "name";
    const COL_MARK = "mark";
    const COL_MODEL = "model";
    const COL_PLACA = "placa";
    const COL_DATE_START = "date_start";
    const COL_DATE_END = "date_end";
    const COL_MODEM_ID = "modem_id";
    const COL_PLATFORM_ID = "platform_id";

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
        $propiedades = $this->toArray();
        $cadena = '';
        foreach ($propiedades as $clave => $valor) {
            $cadena .= $clave . ': ' . $valor . ', ';
        }
        return rtrim($cadena, ', ');
    }
}

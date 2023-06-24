<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sim extends Model
{
    use HasFactory;

    protected $hidden = ["created_at", "updated_at"];

    protected $fillable = [
        "number",
        "imei",
        "reception",
        "active"
    ];


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

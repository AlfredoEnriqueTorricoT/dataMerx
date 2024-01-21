<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modem extends Model
{
    use HasFactory;

    const COL_ID = 'id';
    const COL_CODE = 'code';
    const COL_IMEI = 'imei';
    const COL_RECEPTION = 'reception';
    const COL_ACTIVE = 'active';
    const COL_SIM_ID = 'sim_id';
    const COL_MARK_ID = 'mark_id';
    const COL_PLATFORM_ID = 'platform_id';
    const COL_IS_PENDING = 'is_pending';
    const COL_RESPONSABILITY_ID = "responsability_history_id";
    const COL_USER_RESPONSABILITY_ID = 'user_responsability_id';
    const COL_USER_SUCCESSOR_ID = 'user_successor_id';

    
    protected $fillable = [
        self::COL_CODE,
        self::COL_IMEI,
        self::COL_RECEPTION,
        self::COL_ACTIVE,
        self::COL_SIM_ID,
        self::COL_MARK_ID,
        self::COL_PLATFORM_ID,
        self::COL_IS_PENDING,
        self::COL_RESPONSABILITY_ID,
        self::COL_USER_RESPONSABILITY_ID,
        self::COL_USER_SUCCESSOR_ID,
    ];
    
    protected $hidden = ["created_at", "updated_at"];

    public function platform(){
        return $this->hasOne(Platform::class, "id", "platform_id");
    }

    public function sim(){
        return $this->hasOne(Sim::class, "id", "sim_id");
    }

    public function modems_mark(){
        return $this->hasOne(ModemsMark::class, "id", "mark_id");
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

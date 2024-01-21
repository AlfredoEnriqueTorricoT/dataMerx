<?php

namespace App\Models;

use App\Http\Middleware\ResponsabilityMiddleware;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResponsabilityHistory extends Model
{
    use HasFactory;

    const COL_OBSERVATION ='observation';
    const COL_STATUS ='status';
    const COL_TABLE = 'table';
    const COL_TABLE_ID = 'table_id';
    const COL_USER_RESPONSABILITY_ID = 'user_responsability_id';
    const COL_USER_SUCCESSOR_ID = 'user_successor_id';

    const STATUS_CONFIRMADO = 'Confirmado';
    const STATUS_PENDIENTE ='Pendiente';
    const STATUS_ANULADO = 'Anulado';
    const STATUS_CANCELAR = 'Cancelar';

    const MESSAGE_TO_NONE = 'none';
    const MESSAGE_TO_RECEIVED ='received';
    const MESSAGE_TO_DELIVERED = 'delivered';

    const TABLE_MODEL = 'model';
    const TABLE_WATCH ='watch';

    protected $fillable = [
        self::COL_OBSERVATION,
        self::COL_STATUS,
        self::COL_TABLE,
        self::COL_TABLE_ID,
        self::COL_USER_RESPONSABILITY_ID,
        self::COL_USER_SUCCESSOR_ID
    ];

    
}

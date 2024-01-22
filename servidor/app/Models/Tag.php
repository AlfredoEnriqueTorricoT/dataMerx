<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{

    const COL_NAME = "name";
    const COL_DETAIL = "detail";
    const COL_ACTIVE = "active";
    use HasFactory;


    public $fillable = [
        self::COL_NAME,
        self::COL_DETAIL,
        self::COL_ACTIVE,
    ];
}

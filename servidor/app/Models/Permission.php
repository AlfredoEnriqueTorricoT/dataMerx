<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;


    const COL_ID = "id";
    const COL_NAME = "name";
    const COL_DETAILS = "details";

    public $fillable = [
        self::COL_NAME,
        self::COL_DETAILS,
    ];
}

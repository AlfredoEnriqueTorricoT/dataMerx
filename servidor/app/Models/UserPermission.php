<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    use HasFactory;

    const COL_ID = "id";
    const COL_User_ID = "user_id";
    const COL_PERMISSION_ID = "permission_id";

    public $fillable = [
        self::COL_User_ID,
        self::COL_PERMISSION_ID,
    ];
}

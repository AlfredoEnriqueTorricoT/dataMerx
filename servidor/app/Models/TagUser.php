<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagUser extends Model
{
    use HasFactory;

    public $timestamps = false;

    const COL_TAG_ID = "tag_id";
    const COL_USER_ID = "user_id";

    public $fillable = [
        self::COL_TAG_ID,
        self::COL_USER_ID,
    ];
}

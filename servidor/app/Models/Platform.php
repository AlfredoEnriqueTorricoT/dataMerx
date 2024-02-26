<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Platform extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $hidden = ["password"];
    protected $fillable = [
        "name",
        "detail",
        "url",
        "email",
        "password",
        "credencial",
        "active"
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    const COL_TITLE = "title";
    const COL_DETAIL = "detail";
    const COL_TYPE_ID = "type_id";
    const COL_CAR_ID = "car_id";
    const COL_MODEM_ID = "modem_id";
    const COL_SIM_ID = "sim_id";
    const COL_WATCH_ID = "watch_id";
    const COL_PLATFORM_ID = "platform_id";
    const COL_USER_ID = "user_id";

    public $fillable = [
        self::COL_TITLE,
        self::COL_DETAIL,
        self::COL_TYPE_ID,
        self::COL_CAR_ID,
        self::COL_MODEM_ID,
        self::COL_SIM_ID,
        self::COL_WATCH_ID,
        self::COL_PLATFORM_ID,
        self::COL_USER_ID
    ];

    public function car()
    {
        return $this->hasOne(Car::class, "id", "car_id");
    }

    public function modem()
    {
        return $this->hasOne(Modem::class, "id", "modem_id");
    }

    public function sim()
    {
        return $this->hasOne(Sim::class, "id", "sim_id");
    }

    public function platform()
    {
        return $this->hasOne(Platform::class, "id", "platform_id");
    }

    public function watch()
    {
        return $this->hasOne(Watch::class, "id", "watch_id");
    }

    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name', 'email']);
    }

    public function images()
    {
        return $this->hasMany(Images::class, "table_id", "id")->where("table", "e");
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull(Comment::COL_PARENT_ID)->with(['user', 'replies'])->orderBy('created_at', 'desc');
    }
}

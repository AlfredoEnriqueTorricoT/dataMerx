<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    const COL_COMMENT = 'comment';
    const COL_USER_ID = 'user_id';
    const COL_EVENT_ID = 'event_id';
    const COL_PARENT_ID = 'parent_id';

    public $fillable = [
        self::COL_COMMENT,
        self::COL_USER_ID,
        self::COL_EVENT_ID,
        self::COL_PARENT_ID
    ];

    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name', 'email']);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, self::COL_PARENT_ID);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, self::COL_PARENT_ID)->with(['replies', 'user']);
    }
}

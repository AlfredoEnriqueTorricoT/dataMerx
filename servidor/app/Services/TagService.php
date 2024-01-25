<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{
    public function store($name, $detail, $device, $user_id){
        $tag = Tag::create([
            Tag::COL_NAME => $name,
            Tag::COL_DETAIL => $detail,
            Tag::COL_DEVICE => $device
        ]);

        $tagUser = new TagUserService();
        $tagUser->store($tag->id, $user_id);

    }
}
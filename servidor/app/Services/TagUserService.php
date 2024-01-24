<?php

namespace App\Services;

use App\Models\TagUser;

class TagUserService
{
    public function store($tag_id, $user_id){
        TagUser::create([
            TagUser::COL_TAG_ID => $tag_id,
            TagUser::COL_USER_ID => $user_id
        ]);
    }
}
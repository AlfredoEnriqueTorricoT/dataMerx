<?php


namespace App\Http\Services;

use Illuminate\Support\Facades\DB;

class TagUserService
{
    public function getTagByUser($user_id){

        $sql = "SELECT t.id, t.name, t.detail, t.device, tu.active FROM tag_users tu
        join tags t on t.id = tu.tag_id
        WHERE ?;";

        $tags = DB::select($sql, [$user_id]);

        return $tags;

    }
}
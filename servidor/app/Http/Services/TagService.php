<?php


namespace App\Http\Services;

use App\Models\Tag;
use App\Models\TagUser;
use Exception;
use Illuminate\Support\Facades\DB;

class TagService
{

    public function getByUser($user_id, $device){
        $sql = "SELECT t.name, t.detail, tu.active, t.created_at FROM tags t
        join tag_users tu on t.id = tu.tag_id
        where tu.user_id = ? and device = ?;";
        
        return collect(
            DB::select($sql, [$user_id, $device])
        );
    }

    public function create($obj, $user_id){
        $newTag = Tag::create($obj);

        if(!$newTag){
            throw new Exception("No se ha podido crear la etiquita");
        }

        TagUser::create([
            TagUser::COL_TAG_ID => $newTag["id"],
            TagUser::COL_USER_ID => $user_id
        ]);

        return $newTag;
    }
}
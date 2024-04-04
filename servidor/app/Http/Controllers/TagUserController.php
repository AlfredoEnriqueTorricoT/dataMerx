<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagUserRequest;
use App\Http\Res;
use App\Http\Services\TagUserService;
use App\Models\Tag;
use App\Models\TagUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagUserController extends Controller
{
    //

    public function activeDesactive($id){
        $obj = TagUser::select('id', 'user_id', 'active')->find($id);

        if(!$obj){
            return Res::responseError(
                "No se encontró el registro"
            );
        }
        // Has permission
        if(auth()->user()->id != $obj[TagUser::COL_USER_ID]){
            return Res::responseError(
                "No tienes permisos para realizar esta acción"
            );
        }

        $obj->active = !$obj->active;
        $obj->save();

        return Res::responseSuccess(
            $obj
        );
    }


    public function getUserIdAssign($tag_id){        

        $users_id = TagUser::where(TagUser::COL_TAG_ID, $tag_id)->pluck("id");

        
        return Res::responseSuccess(
            $users_id
        );
    }

    public function getByUser(){
        $tagUserService = new TagUserService();
        $user_id = auth()->user()->id;

        return Res::responseSuccess(
            $tagUserService->getTagByUser($user_id)
        );
    }

    public function addUser(TagUserRequest $request, TagUserService $tagUserService){
        TagUser::firstOrCreate([
            TagUser::COL_TAG_ID => $request[TagUser::COL_TAG_ID],
            TagUser::COL_USER_ID => $request[TagUser::COL_USER_ID],
        ]);

        return Res::responseSuccess(
            $tagUserService->getTagByUser($request[TagUser::COL_USER_ID])
        );
    }

    public function deleteUser(TagUserRequest $request, TagUserService $tagUserService){
        TagUser::where([
            TagUser::COL_TAG_ID => $request[TagUser::COL_TAG_ID],
            TagUser::COL_USER_ID => $request[TagUser::COL_USER_ID],
        ])->delete();

        return Res::responseSuccess(
            $tagUserService->getTagByUser($request[TagUser::COL_USER_ID])
        );
    }
    
}

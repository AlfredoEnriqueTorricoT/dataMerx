<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Res;
use App\Models\Tag;
use App\Services\TagUserService;
use Illuminate\Http\Request;

class TagController extends Controller
{
    //
    public function index(){
        $list = Tag::all();
        return Res::responseSuccess($list);
    }

    public function store(Request $request, TagUserService $tagUserService){
        $obj = Tag::create($request->all());
        $tagUserService->store($obj->id, auth()->user()->id);
        return Res::responseSuccess($obj);
    }

    public function update(Request $request, Tag $tag){
        $tag->fill($request->all());
        $tag->save();
        return Res::responseSuccess($tag);
    }

    public function deleteLogic(Tag $tag){
        $tag[Tag::COL_ACTIVE] = false;
        $tag->save();
        return Res::responseSuccess(Tag::all());
    }
    
}

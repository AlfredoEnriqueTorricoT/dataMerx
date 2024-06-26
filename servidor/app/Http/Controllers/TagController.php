<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagRequest;
use App\Http\Res;
use App\Http\Services\TagService;
use App\Models\Tag;
use App\Models\User;
use App\Services\TagUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    //
    public function index(){
        return Res::responseSuccess([
            "tags" => Tag::all(),
            "users" => User::all(['id', 'name'])
        ]);
    }

    public function store(TagRequest $request, TagService $tagService){
        $obj = $tagService->create($request->all(), auth()->user()->id);
        return Res::responseSuccess($obj);
    }

    public function update(Request $request, Tag $tag){
        $tag->fill($request->all());
        $tag->save();
        return Res::responseSuccess($tag);
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Res;
use App\Models\TagUser;
use Illuminate\Http\Request;

class TagUserController extends Controller
{
    //

    public function activeDesactive($id){
        
        $obj = TagUser::select('id', 'active')->find($id);
        $obj->active = !$obj->active;
        $obj->save();

        return Res::responseSuccess(
            $obj
        );
    }
}

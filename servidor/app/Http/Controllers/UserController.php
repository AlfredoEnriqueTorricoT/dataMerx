<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
    public function index()
    {
        try {
            $list = User::all();
            return Res::responseSuccess($list);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }



    public function store(Request $request)
    {
        //echo $request->bearerToken();
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users|max:255',
                'password' => 'required|min:6',
            ]);
            // Return errors if validation error occur.
            if ($validator->fails()) {

                return Res::responseErrorValidate($validator->errors());
            }

            $request->privilege = 1;
            $request->status = true;

            $obj = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'active' => true,
                'privilege' => 1,
                'password' => Hash::make($request->password)
            ]);


            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function update(Request $request)
    {
        try {
            if ($request->id == "") {
                return Res::responseErrorNoId();
            }

            $obj = User::findOrFail($request->id);

            if ($obj == null) {
                return Res::responseErrorNoData();
            }


            $obj->fill($request->json()->all());
            if ($request->password) {
                $obj->password = Hash::make($request->password);
            }
            $obj->save();

            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

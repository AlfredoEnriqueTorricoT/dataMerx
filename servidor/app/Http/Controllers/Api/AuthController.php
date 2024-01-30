<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserPermissionController;
use App\Http\Res;
use App\Models\User;
use App\Models\UserPermission;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //

    public function register(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:6',
        ]);
        // Return errors if validation error occur.
        if ($validator->fails()) {

            return Res::responseErrorValidate($validator->errors());
        }
        // Check if validation pass then create user and auth token. Return the auth token
        if ($validator->passes()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;

            $user->token = $token;
            unset($user->id);
            return Res::responseSuccess($user);
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return Res::responseError432("Correo o contraseña incorrecto", null);
        }
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        $user->token = $token;

        $userPermissions = new UserPermissionController();
        
        $user->permissions = $userPermissions->getAllPermission($user->id);

        

        return Res::responseSuccess($user);
    }


    public function update(Request $request)
    {        
        try {
            if (auth()->user()->id == "") {
                return Res::responseErrorNoId();
            }
            $obj = User::findOrFail(auth()->user()->id);

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

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return Res::responseSuccess([]);
    }
}

<?php

namespace App\Http\Controllers;


use App\Http\Res;
use App\Models\User;
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
            return Res::responseError432("Correo o contraseña incorrepto", null);
        }
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        $user->token = $token;
        unset($user->id);

        return Res::responseSuccess($user);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return Res::responseSuccess([]);
    }
}

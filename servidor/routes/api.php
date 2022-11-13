<?php

use App\Http\Controllers\ModemsMarkController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('user', [App\Http\Controllers\API\AuthController::class, 'index'])->middleware("auth:sanctum");
Route::post('user', [App\Http\Controllers\API\AuthController::class, 'register']);
Route::put('user', [App\Http\Controllers\API\AuthController::class, 'update'])->middleware("auth:sanctum");
Route::post('login', [App\Http\Controllers\API\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'AuthController@register');


Route::get('modem-mark', [ModemsMarkController::class,'index']);
Route::post('modem-mark', [ModemsMarkController::class,'store']);
Route::put('modem-mark', [ModemsMarkController::class,'update']);

Route::get('user', [UserController::class,'index']);
Route::post('user', [UserController::class,'store']);
Route::put('user', [UserController::class,'update']);

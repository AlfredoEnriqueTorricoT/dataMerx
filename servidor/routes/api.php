<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ModemsMarkController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\SimController;
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
Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout'])->middleware("auth:sanctum");

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

Route::get('sim', [SimController::class,'index']);
Route::post('sim', [SimController::class,'store'])->middleware("auth:sanctum");;
Route::put('sim', [SimController::class,'update']);

Route::get('car', [CarController::class,'index']);
Route::post('car', [CarController::class,'store']);
Route::put('car', [CarController::class,'update']);

Route::get('event', [EventController::class,'index']);

Route::get('platform', [PlatformController::class,'index']);
Route::post('platform', [PlatformController::class,'store']);
Route::put('platform', [PlatformController::class,'update']);

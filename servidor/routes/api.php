<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ModemController;
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

Route::get('modem', [ModemController::class,'index']);
Route::get('modem/{imei}', [ModemController::class,'indexSearch']);
Route::get('modem/details/{id}', [ModemController::class,'details']);
Route::post('modem', [ModemController::class,'store'])->middleware("auth:sanctum");
Route::post('modem/event', [ModemController::class,'event']);
Route::put('modem', [ModemController::class,'update']);
Route::put('modem/update-sim', [ModemController::class,'update_sim'])->middleware("auth:sanctum");
Route::post('modem-upload', [ModemController::class,'storeUpload'])->middleware("auth:sanctum");

Route::get('modem-mark', [ModemsMarkController::class,'index']);
Route::post('modem-mark', [ModemsMarkController::class,'store']);
Route::put('modem-mark', [ModemsMarkController::class,'update']);

Route::get('user', [UserController::class,'index']);
Route::post('user', [UserController::class,'store']);
Route::put('user', [UserController::class,'update']);

Route::get('sim', [SimController::class,'index']);
Route::get('sim/{imei}', [SimController::class,'indexSearch']);
Route::get('sim/details/{id}', [SimController::class,'details']);
Route::post('sim', [SimController::class,'store'])->middleware("auth:sanctum");
Route::post('sim/event', [SimController::class,'event']);
Route::put('sim', [SimController::class,'update']);
Route::post('sim-upload', [SimController::class,'storeUpload'])->middleware("auth:sanctum");

Route::get('car', [CarController::class,'index']);
Route::get('car/{placa}', [CarController::class,'indexSearchPlaca']);
Route::get('car/details/{id}', [CarController::class,'details']);
Route::post('car', [CarController::class,'store'])->middleware("auth:sanctum");
Route::post('car/event', [CarController::class,'event']);
Route::put('car', [CarController::class,'update']);
Route::put('car/update-modem', [CarController::class,'update_modem'])->middleware("auth:sanctum");
Route::post('car-upload', [CarController::class,'storeUpload'])->middleware("auth:sanctum");

Route::get('event', [EventController::class,'index']);
Route::get('event/car/{id}', [EventController::class,'car']);
Route::get('event/modem/{id}', [EventController::class,'modem']);
Route::get('event/sim/{id}', [EventController::class,'sim']);
Route::post('event', [EventController::class,'store']);
Route::post('event-upload', [EventController::class,'storeUpload']);

Route::get('platform', [PlatformController::class,'index']);
Route::post('platform', [PlatformController::class,'store']);
Route::put('platform', [PlatformController::class,'update']);

Route::post('images', [ImagesController::class,'upload']);

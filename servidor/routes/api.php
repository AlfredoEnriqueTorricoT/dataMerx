<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientCarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ModemController;
use App\Http\Controllers\ModemsMarkController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\SimController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WifiController;
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
Route::get('user', [AuthController::class, 'index'])->middleware("auth:sanctum");
Route::post('user', [AuthController::class, 'register']);
Route::put('user', [AuthController::class, 'update'])->middleware("auth:sanctum");
Route::post('login', [AuthController::class, 'login']);
Route::put('login', [AuthController::class, 'update'])->middleware("auth:sanctum");
Route::post('/logout', [AuthController::class, 'logout'])->middleware("auth:sanctum");

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);

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
Route::get('car/for-assign/{placa}/{client_id}', [CarController::class,'indexSearchPlacaForAssign']);
Route::get('car/{placa}', [CarController::class,'indexSearchPlaca']);
Route::get('car/details/{id}', [CarController::class,'details']);
Route::post('car', [CarController::class,'store'])->middleware("auth:sanctum");
Route::post('car/event', [CarController::class,'event']);
Route::put('car', [CarController::class,'update']);
Route::put('car/update-modem', [CarController::class,'update_modem'])->middleware("auth:sanctum");
Route::post('car-upload', [CarController::class,'storeUpload'])->middleware("auth:sanctum");


Route::get('event/car/{id}', [EventController::class,'car']);
Route::get('event/modem/{id}', [EventController::class,'modem']);
Route::get('event/sim/{id}', [EventController::class,'sim']);
Route::get('event/{type}/{id}', [EventController::class,'index']);
Route::get('event-images/{id}', [EventController::class,'images']);
Route::post('event', [EventController::class,'store']);
Route::post('event-upload', [EventController::class,'storeUpload']);

Route::get('platform', [PlatformController::class,'index']);
Route::post('platform', [PlatformController::class,'store']);
Route::put('platform', [PlatformController::class,'update']);

Route::get('client/{ci}', [ClientController::class,'indexSearch']);
Route::post('client', [ClientController::class,'store']);
Route::put('client', [ClientController::class,'update']);

Route::post('client-car', [ClientCarController::class,'store']);
Route::delete('client-car/{obj}', [ClientCarController::class,'destroy']);

Route::post('images', [ImagesController::class,'upload']);


Route::get('wifi', [WifiController::class,'index']);
Route::post('wifi', [WifiController::class,'store']);
Route::put('wifi', [WifiController::class,'update']);
Route::delete('wifi/{obj}', [WifiController::class,'destroy']);
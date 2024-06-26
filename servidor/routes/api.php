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
use App\Http\Controllers\SigueloController;
use App\Http\Controllers\SimController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TagUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\WatchController;
use App\Http\Controllers\WatchLogController;
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

Route::post('/register', [AuthController::class, 'register'])->middleware("auth:sanctum");

Route::get('modem', [ModemController::class,'index'])->middleware("auth:sanctum");
Route::get('modem/details/{id}', [ModemController::class,'details'])->middleware("auth:sanctum");
Route::get('modem/remove-sim/{id}', [ModemController::class,'remove_sim'])->middleware("auth:sanctum");
Route::get('modem/{imei}', [ModemController::class,'indexSearch'])->middleware("auth:sanctum");;
Route::post('modem', [ModemController::class,'store'])->middleware("auth:sanctum");
Route::post('modem/event', [ModemController::class,'event'])->middleware("auth:sanctum");;
Route::post('modem/filter', [ModemController::class,'filterByPatformAndResponsabilityTags'])->middleware("auth:sanctum");
Route::put('modem', [ModemController::class,'update'])->middleware("auth:sanctum");
Route::put('modem/update-sim', [ModemController::class,'update_sim'])->middleware("auth:sanctum");
Route::post('modem-upload', [ModemController::class,'storeUpload'])->middleware("auth:sanctum");
Route::post('modem-upload-add', [ModemController::class,'updloadImage'])->middleware("auth:sanctum");
Route::post('modem-enabled-disabled', [ModemController::class,'enabled_disable'])->middleware("auth:sanctum");
Route::post('modem/transfer_request', [ModemController::class,'transferRequest'])->middleware(["auth:sanctum", "canTransferModem"]);
Route::post('modem/transfer_confirm', [ModemController::class,'transferConfirm'])->middleware(["auth:sanctum", "canTransferRespondeModem"]);
Route::post('modem/transfer_cancel', [ModemController::class,'transferCancel'])->middleware(["auth:sanctum", "canTransferRespondeModem"]);
Route::post('modem/transfer_anular', [ModemController::class,'transferAnular'])->middleware(["auth:sanctum", "canTransferAnularRequestModem"]);

Route::get('modem-mark', [ModemsMarkController::class,'index']);
Route::post('modem-mark', [ModemsMarkController::class,'store']);
Route::put('modem-mark', [ModemsMarkController::class,'update']);

Route::get('user', [UserController::class,'index']);
Route::post('user', [UserController::class,'store']);
Route::put('user', [UserController::class,'update']);

Route::get('user-permission/{user_id}', [UserPermissionController::class,'index']);
Route::post('user-permission', [UserPermissionController::class,'createAndDelete']);

Route::get('sim', [SimController::class,'index']);
Route::get('sim/{imei}', [SimController::class,'indexSearch']);
Route::get('sim/details/{id}', [SimController::class,'details']);
Route::post('sim', [SimController::class,'store'])->middleware("auth:sanctum");
Route::post('sim/event', [SimController::class,'event']);
Route::put('sim', [SimController::class,'update'])->middleware("auth:sanctum");;
Route::post('sim-upload', [SimController::class,'storeUpload'])->middleware("auth:sanctum");
Route::post('sim-upload-add', [SimController::class,'updloadImage'])->middleware("auth:sanctum");
Route::post('sim-enabled-disabled', [SimController::class,'enabled_disable'])->middleware("auth:sanctum");

Route::get('car', [CarController::class,'index'])->middleware("auth:sanctum");
Route::get('car/for-assign/{placa}/{client_id}', [CarController::class,'indexSearchPlacaForAssign'])->middleware("auth:sanctum");
Route::get('car/{placa}', [CarController::class,'indexSearchPlaca'])->middleware("auth:sanctum");
Route::get('car/details/{id}', [CarController::class,'details'])->middleware("auth:sanctum");
Route::get('car/remove-modem/{id}', [CarController::class,'remove_modem'])->middleware("auth:sanctum");
Route::get('car/test/{id}', [CarController::class,'getElements'])->middleware("auth:sanctum");
Route::post('car', [CarController::class,'store'])->middleware("auth:sanctum");
Route::post('car/event', [CarController::class,'event']);
Route::put('car', [CarController::class,'update'])->middleware("auth:sanctum");
Route::put('car/update-modem', [CarController::class,'update_modem'])->middleware("auth:sanctum");
Route::post('car-upload', [CarController::class,'storeUpload'])->middleware("auth:sanctum");
Route::post('car-upload-add', [CarController::class,'updloadImage'])->middleware("auth:sanctum");


Route::get('event/car/{id}', [EventController::class,'car']);
Route::get('event/modem/{id}', [EventController::class,'modem']);
Route::get('event/sim/{id}', [EventController::class,'sim']);
Route::get('event/watch/{id}', [EventController::class,'watch']);
Route::get('event/{type}/{id}', [EventController::class,'index']);
Route::get('event-images/{id}', [EventController::class,'images']);
Route::post('event', [EventController::class,'store']);
Route::post('event-upload', [EventController::class,'storeUpload']);
Route::post('event/server-siguelo', [EventController::class,'eventServerSiguelo']);

Route::get('platform', [PlatformController::class,'index']);
Route::get('platform/count', [PlatformController::class,'countDevice']);
Route::post('platform', [PlatformController::class,'store']);
Route::put('platform', [PlatformController::class,'update']);
Route::get('platforms/{platform_id}/wifis', [PlatformController::class, 'index']);
Route::post('platforms/{platform}/wifis', [PlatformController::class,'storeWifi']);
Route::put('platforms/wifi', [PlatformController::class,'update']);

Route::get('client/{ci}', [ClientController::class,'indexSearch']);
Route::post('client', [ClientController::class,'store']);
Route::put('client', [ClientController::class,'update']);

Route::post('client-car', [ClientCarController::class,'store']);
Route::delete('client-car/{obj}', [ClientCarController::class,'destroy']);

Route::post('images', [ImagesController::class,'upload']);

Route::get('watch/{platform_id}', [WatchController::class,'index']);
Route::get('watch/{watch}/get_wifi', [WatchController::class,'get_wifi']);
Route::get('watch/code/{code}', [WatchController::class,'getConfigByCode']);
Route::post('watch', [WatchController::class,'store']);
Route::post('watch/getDataConfigForWatch', [WatchController::class,'getDataConfigForWatch']);
Route::post("watch/event", [WatchController::class, "event"]);
Route::put('watch', [WatchController::class,'update']);
Route::delete('watch/{watch}', [WatchController::class,'destroy']);

Route::get('wifi/{platform_id}', [WifiController::class,'index']);
Route::post('wifi', [WifiController::class,'store']);
Route::put('wifi', [WifiController::class,'update']);
Route::delete('wifi/{wifi}', [WifiController::class,'destroy']);

Route::get('tag', [TagController::class, 'index'])->middleware("auth:sanctum");
Route::post('tag', [TagController::class, 'store'])->middleware("auth:sanctum");
Route::put('tag/{tag}', [TagController::class, 'update'])->middleware("auth:sanctum");
Route::delete('tag/{tag}', [TagController::class, 'deleteLogic'])->middleware("auth:sanctum");

Route::get('tag_user/check/{id}', [TagUserController::class, 'activeDesactive'])->middleware("auth:sanctum");
Route::get('tag_user', [TagUserController::class, 'getByUser'])->middleware("auth:sanctum");
Route::get('tag_user/assign/{tag_id}', [TagUserController::class, 'getUserIdAssign'])->middleware("auth:sanctum");
Route::post('tag_user/add', [TagUserController::class, 'addUser'])->middleware("auth:sanctum");
Route::post('tag_user/delete', [TagUserController::class, 'deleteUser'])->middleware("auth:sanctum");


Route::get('watch_log/{macAddress}', [WatchLogController::class, 'index']);
Route::get('watch_log/create/{macAddress}', [WatchLogController::class, 'store']);    


Route::post('siguelo/getByImei', [SigueloController::class, 'getDeviceByPlatforms']);
Route::post('siguelo/getCountByDate', [SigueloController::class, 'getDevicesCountByPlatforms']);
Route::post('siguelo/getImeiByDate', [SigueloController::class, 'getImeiByDate']);
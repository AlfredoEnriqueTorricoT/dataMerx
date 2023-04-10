<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\ClientCar;
use Exception;
use Illuminate\Http\Request;

class ClientCarController extends Controller
{
    //

    function store(Request $request)
    {
        try {
            $obj = ClientCar::create($request->all());
            return Res::responseSuccess($obj);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function destroy(ClientCar $obj)
    {
        try {
            $obj->delete();
            return Res::responseSuccessDelete();
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResponsabilityRequest;
use App\Http\Res;
use App\Http\Services\ResponsabilityServices;

class ResponsabilityController extends Controller
{

    public function store(ResponsabilityRequest $request, ResponsabilityServices $responsabilityServices)
    {
        $data = $request->validated();

        $responsability = $responsabilityServices->store($data);

        return Res::responseSuccess($responsability);
    }
}

<?php

namespace App\Http\Middleware;

use App\Http\Res;
use App\Models\Modem;
use Closure;
use Illuminate\Http\Request;

class CanTransferResponseModemMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user_id = auth()->user()->id;
        $modem = Modem::findOrFail($request->id);

        if(!$modem[Modem::COL_IS_PENDING]){
            return Res::responseError432("Este moden no tiene solicitud pendiente", null);
        }

        if($user_id == $modem[Modem::COL_USER_SUCCESSOR_ID]){
            $request["middleware_modem"] = $modem;
            return $next($request);
        }   
        

        return Res::responseError432("No tienes permisos para responder esta solicitud.", null);
    }
}

<?php

namespace App\Http\Middleware;

use App\Http\Res;
use App\Models\Modem;
use Closure;
use Illuminate\Http\Request;

class CanTransferModemAnularMiddleware
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
        $modem = Modem::findOrFail($request->id);
        $user_id =  auth()->user()->id;
        if (
            $modem[Modem::COL_IS_PENDING]
            && $modem[Modem::COL_USER_RESPONSABILITY_ID] == $user_id
        ) {

            $request["middleware_modem"] = $modem;
            return $next($request);
        }

        return Res::responseError432("No tienes permisos para transferir este modem", null);
    }
}

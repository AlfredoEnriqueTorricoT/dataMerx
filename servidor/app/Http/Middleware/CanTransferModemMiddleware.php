<?php

namespace App\Http\Middleware;

use App\Http\Res;
use App\Models\Modem;
use App\Models\User;
use App\Services\PermissionService;
use Closure;
use Illuminate\Http\Request;

class CanTransferModemMiddleware
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

        if($modem[Modem::COL_IS_PENDING]){
            $user_successor = User::findOrFail($request->user_successor_id);
            $user_reponsability = User::findOrFail(auth()->user()->id);
            return Res::responseError432(
                "El modem tiene una solicitud de transferiencia pendiente de $user_reponsability->name a $user_successor->name.",
                null
            );
        }

        
        if($modem[Modem::COL_USER_RESPONSABILITY_ID] == $user_id){
            $request["middleware_modem"] = $modem;
            return $next($request);
        }

        $permissionService = new PermissionService();
        if($permissionService->hasPermission($user_id, "responsability_admin")){
            return $next($request);
        }

        return Res::responseError432("No tienes permisos para transferir este modem", null);
        
    }
}

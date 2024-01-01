<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Permission;
use App\Models\UserPermission;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;

class UserPermissionController extends Controller
{
    //
    public function index($user_id){
        return Res::responseSuccess(
            $this->getAllPermission($user_id)
        );
    }
    public function createAndDelete(Request $request)
    {
        $permission = Permission::where(Permission::COL_NAME, $request->permission)->first();

        if($permission == null){
            return Res::responseError432("No existe el permiso", null);
        }

        $existingUserPermission = UserPermission::where([
            [UserPermission::COL_User_ID, $request->user_id],
            [UserPermission::COL_PERMISSION_ID, $permission->id],
        ])->first();

        if ($existingUserPermission) {
            // Si ya existe, elimina el registro
            $existingUserPermission->delete();
            $message = 'Registro eliminado correctamente.';
        } else {
            // Si no existe, crea un nuevo registro
            UserPermission::create([
                UserPermission::COL_User_ID => $request->user_id,
                UserPermission::COL_PERMISSION_ID => $permission->id,
            ]);
            $message = 'Registro creado correctamente.';
        }

        return Res::responseSuccess(
            $this->getAllPermission($request->user_id),
            $message
        );
    }

    public function getAllPermission($user_id)
    {
        $userPermission = UserPermission::where(UserPermission::COL_User_ID, $user_id)->get();
        $permission = [];
        foreach ($userPermission as $key => $value) {
            $permission[$key] = Permission::where(Permission::COL_ID, $value->permission_id)->first(["id", "name"]);
        }
        return $permission;
    }
}

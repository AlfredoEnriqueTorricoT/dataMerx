<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\UserPermission;

class PermissionService
{
    public function hasPermission($user_id, $permission)
    {
        $permission = Permission::where("name", $permission)->first();

        return UserPermission::where([
            ["user_id", $user_id],
            ["permission_id", $permission->id]
        ])->exists();
    }
}
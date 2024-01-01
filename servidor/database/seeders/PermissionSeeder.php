<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Permission::create([
            "name" => "platforms",
            "details" => "_"
        ]);

        Permission::create([
            "name" => "users",
            "details" => "_"
        ]);

        Permission::create([
            "name" => "watchs",
            "details" => "_"
        ]);

        Permission::create([
            "name" => "modems",
            "details" => "_"
        ]);

        Permission::create([
            "name" => "sims",
            "details" => "_"
        ]);

        Permission::create([
            "name" => "cars",
            "details" => "_"
        ]);
    }
}

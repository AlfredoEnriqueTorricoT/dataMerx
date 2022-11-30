<?php

namespace Database\Seeders;

use App\Models\ModemsMark;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModemMarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        ModemsMark::create([
            "name" => "GT06N",
            "detail" => ""
        ]);
        ModemsMark::create([
            "name" => "x-3",
            "detail" => ""
        ]);

    }
}

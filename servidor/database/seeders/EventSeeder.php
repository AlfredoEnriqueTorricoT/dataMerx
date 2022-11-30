<?php

namespace Database\Seeders;

use App\Models\EventType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        EventType::create([
            "name" => "Informacion",
            "status" => "info",
        ]);
        EventType::create([
            "name" => "Advertencias",
            "status" => "warn",
        ]);

        EventType::create([
            "name" => "Errores",
            "status" => "error",
        ]);
    }
}

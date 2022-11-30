<?php

namespace Database\Seeders;

use App\Models\Platform;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Platform::create([
            "name" => "Plan 3000",
            "detail" => "",
            "url" => "https://transporte.siguelo.com.bo",
            "email" => "torrico.torrico.alexander@gmail.com",
            "password" => "siguelo***",
            "active" => true
        ]);
        Platform::create([
            "name" => "La Guardia",
            "detail" => "",
            "url" => "https://30-marzo.siguelo.com.bo",
            "email" => "torrico.torrico.alexander@gmail.com",
            "password" => "siguelo***",
            "active" => true
        ]);
        Platform::create([
            "name" => "Privado",
            "detail" => "",
            "url" => "https://vol25.siguelo.com.bo",
            "email" => "torrico.torrico.alexander@gmail.com",
            "password" => "siguelo***",
            "active" => true
        ]);

    }
}

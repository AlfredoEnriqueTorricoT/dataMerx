<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_cars', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("client_id")->unsigned();
            $table->bigInteger("car_id")->unsigned();

            $table->foreign("client_id")->references("id")->on("clients")
                ->onUpdate("cascade");

            $table->foreign("car_id")->references("id")->on("cars")
                ->onUpdate("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_cards');
    }
};

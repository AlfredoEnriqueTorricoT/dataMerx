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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('detail');


            $table->bigInteger('type_id')->nullable()->unsigned();
            $table->bigInteger('car_id')->nullable()->unsigned();
            $table->bigInteger('modem_id')->nullable()->unsigned();
            $table->bigInteger('sim_id')->nullable()->unsigned();
            $table->bigInteger('platform_id')->nullable()->unsigned();
            $table->bigInteger('user_id')->nullable()->unsigned();

            $table->foreign('type_id')->references('id')->on('event_types')
                ->onUpdate('cascade');
            $table->foreign('car_id')->references('id')->on('cars')
                ->onUpdate('cascade');
            $table->foreign('modem_id')->references('id')->on('modems')
                ->onUpdate('cascade');
            $table->foreign('sim_id')->references('id')->on('sims')
                ->onUpdate('cascade');
            $table->foreign('platform_id')->references('id')->on('platforms')
                ->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade');


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
        Schema::dropIfExists('events');
    }
};

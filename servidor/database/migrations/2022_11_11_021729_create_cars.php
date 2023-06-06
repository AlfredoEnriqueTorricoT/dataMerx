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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name', 10)->nullable();
            $table->string('mark', 30);
            $table->string('model', 30);
            $table->string('placa', 10);
            $table->date('date_start');
            $table->date('date_end');

            $table->bigInteger('modem_id')->nullable()->unsigned();
            $table->bigInteger('platform_id')->nullable()->unsigned();

            $table->timestamps();


            $table->foreign('modem_id')->references('id')->on('modems')
                ->onUpdate('cascade');
            $table->foreign('platform_id')->references('id')->on('platforms')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
};

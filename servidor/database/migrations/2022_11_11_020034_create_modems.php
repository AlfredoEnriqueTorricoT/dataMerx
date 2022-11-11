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


        Schema::create('modems', function (Blueprint $table) {
            $table->id();
            $table->string('code', 5);
            $table->string('imei', 30);
            $table->date('reception');
            $table->boolean('active')->default(true);

            $table->bigInteger('sim_id')->nullable()->unsigned();
            $table->bigInteger('mark_id')->nullable()->unsigned();
            $table->bigInteger('platform_id')->nullable()->unsigned();

            $table->foreign('sim_id')->references('id')->on('sims')
                ->onUpdate('cascade');
            $table->foreign('mark_id')->references('id')->on('modems_marks')
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
        Schema::dropIfExists('modems');
    }
};

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
        Schema::table('modems', function (Blueprint $table) {
            //
            $table->bigInteger("platform_id")->unsigned()->nullable()->after("mark_id");

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
        Schema::table('modems', function (Blueprint $table) {
            //
        });
    }
};

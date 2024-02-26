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
        Schema::create('watch_logs', function (Blueprint $table) {
            $table->id();
            $table->string("mac_address")->nullable();
            
            $table->unsignedBigInteger("watch_id")->nullable();

            $table->timestamps();


            $table->foreign("watch_id")->references("id")->on("watches")
                ->onUpdate("cascade")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('watch_logs');
    }
};

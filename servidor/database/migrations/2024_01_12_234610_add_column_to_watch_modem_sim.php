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
            $table->boolean("is_pending")->default(false);
            $table->unsignedBigInteger("responsability_history_id")->after("platform_id")->nullable();
            $table->unsignedBigInteger("user_responsability_id")->after("responsability_history_id")->nullable();
            $table->unsignedBigInteger("user_successor_id")->after("user_responsability_id")->nullable();        

            $table->foreign("responsability_history_id")->references("id")->on("responsability_histories")
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->foreign("user_responsability_id")->references("id")->on("users")
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->foreign("user_successor_id")->references("id")->on("users")
                ->onUpdate("cascade")
                ->onDelete("cascade");
        });

        

        Schema::table('watches', function (Blueprint $table) {
            //
            $table->boolean("is_pending")->default(false);
            $table->unsignedBigInteger("responsability_history_id")->after("platform_id")->nullable();
            $table->unsignedBigInteger("user_responsability_id")->after("responsability_history_id")->nullable();
            $table->unsignedBigInteger("user_successor_id")->after("user_responsability_id")->nullable();        

            $table->foreign("responsability_history_id")->references("id")->on("responsability_histories")
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->foreign("user_responsability_id")->references("id")->on("users")
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->foreign("user_successor_id")->references("id")->on("users")
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
        Schema::table('watch_modem_sim', function (Blueprint $table) {
            //
        });
    }
};

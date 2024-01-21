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
        Schema::create('responsability_histories', function (Blueprint $table) {
            $table->id();
                    
            $table->string("observation")->nullable();
            $table->enum("status", ["Confirmado", "Pendiente", "Anulado", "Cancelar"])->nullable();
            $table->enum("table", ["modem", "sim", "watch","computer"])->nullable();
            $table->integer("table_id")->nullable();
            $table->unsignedBigInteger("user_responsability_id")->nullable();
            $table->unsignedBigInteger("user_successor_id")->nullable();  

            $table->foreign("user_responsability_id")->references("id")->on("users")
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->foreign("user_successor_id")->references("id")->on("users")
                ->onUpdate("cascade")
                ->onDelete("cascade");
            
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
        Schema::dropIfExists('responsabilities');
    }
};

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
        Schema::create('platforms', function (Blueprint $table) {
            $table->id();
            $table->string('name',20);
            $table->string('detail')->nullable();
            $table->string('url')->nullable();
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->boolean('active')->default(true);
        });
        Schema::create('modems_marks', function (Blueprint $table) {
            $table->id();
            $table->string('name',20);
            $table->string('detail')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('platforms');
        Schema::dropIfExists('modems_marks');
    }
};

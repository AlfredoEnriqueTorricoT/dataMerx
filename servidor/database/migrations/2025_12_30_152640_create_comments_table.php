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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('comment');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('parent_id')->nullable();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->foreign('event_id')->references('id')->on('events')
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->foreign('parent_id')->references('id')->on('comments')
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
        Schema::dropIfExists('comments');
    }
};

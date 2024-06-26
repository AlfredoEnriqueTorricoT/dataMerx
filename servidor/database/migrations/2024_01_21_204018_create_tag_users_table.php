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
        Schema::create('tag_users', function (Blueprint $table) {
            $table->id();
            $table->boolean("active")->default(true);
            $table->unsignedBigInteger("tag_id");
            $table->unsignedBigInteger("user_id");

            $table->foreign("tag_id")->references("id")->on("tags")
                ->onCascade("cascade")
                ->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("users")
                ->onCascade("cascade")
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
        Schema::dropIfExists('tag_users');
    }
};

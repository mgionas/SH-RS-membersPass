<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pass_templates', function (Blueprint $table) {
            $table->id();
            $table->string('type')->unique();
            $table->string('title');
            $table->string('platform');
            $table->string('style');
            $table->integer('issued_passes_count');
            $table->integer('installed_passes_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pass_templates');
    }
};

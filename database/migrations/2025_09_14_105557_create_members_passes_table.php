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
        Schema::create('members_passes', function (Blueprint $table) {
            $table->id();
            $table->string('member_id')->nullable();
            $table->foreign('member_id')->references('member_id')->on('members')->onDelete('cascade');
            $table->string('pass_type');
            $table->foreign('pass_type')->references('type')->on('pass_templates')->onDelete('cascade');
            $table->string('serial_number')->unique();
            $table->dateTime('issue_date');
            $table->dateTime('installed_date')->nullable();
            $table->string('status')->nullable();
            $table->longText('url');
            $table->string('nfc_payload');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members_passes');
    }
};

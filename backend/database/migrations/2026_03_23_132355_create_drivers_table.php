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
        Schema::create('drivers', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')
      ->constrained()
      ->cascadeOnDelete();
$table->string('vehicle_type')->nullable();
$table->string('license_number')->nullable();
    $table->boolean('is_available')->default(true);
    $table->double('current_lat')->nullable();
    $table->double('current_lng')->nullable();
    $table->timestamp('last_online_at')->nullable();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
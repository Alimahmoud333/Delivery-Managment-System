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
        Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')
      ->constrained()
      ->cascadeOnDelete();
    $table->foreignId('pickup_address_id');
    $table->foreignId('dropoff_address_id');
$table->enum('status',[
    'pending',
    'assigned',
    'accepted',
    'in_transit',
    'delivered',
    'canceled'
])->default('pending');
    $table->decimal('price',10,2);
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
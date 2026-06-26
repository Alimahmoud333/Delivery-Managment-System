<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run migrations
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {

            $table->id();

            /* sender */
            $table->foreignId('sender_id')
                ->constrained('users')
                ->cascadeOnDelete();

            /* receiver */
            $table->foreignId('receiver_id')
                ->constrained('users')
                ->cascadeOnDelete();

            /* text message */
            $table->text('message')->nullable();

            /*
            text
            image
            video
            location
            file
            */
            $table->enum('type', [
                'text',
                'image',
                'video',
                'location',
                'file'
            ])->default('text');

            /* uploaded file path */
            $table->string('file')->nullable();

            /* location */
            $table->decimal('latitude', 10, 7)->nullable();

            $table->decimal('longitude', 10, 7)->nullable();

            /* seen */
            $table->boolean('is_seen')
                ->default(false);

            $table->timestamp('seen_at')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse migrations
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
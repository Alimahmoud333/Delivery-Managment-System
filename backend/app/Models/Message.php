<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [

        'sender_id',

        'receiver_id',

        'message',

        'type',

        'file',

        'latitude',

        'longitude',

        'is_seen',

        'seen_at',
    ];

    protected $casts = [

        'latitude' => 'float',

        'longitude' => 'float',

        'is_seen' => 'boolean',

        'seen_at' => 'datetime',
    ];

    /*
    ============================
    SENDER
    ============================
    */

    public function sender()
    {
        return $this->belongsTo(
            User::class,
            'sender_id'
        );
    }

    /*
    ============================
    RECEIVER
    ============================
    */

    public function receiver()
    {
        return $this->belongsTo(
            User::class,
            'receiver_id'
        );
    }
}
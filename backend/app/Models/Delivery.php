<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = [
        'order_id',
        'driver_id',
        'status',
        'assigned_at',
        'picked_at',
        'delivered_at'
    ];

    protected $casts = [
    'assigned_at' => 'datetime',
    'picked_at' => 'datetime',
    'delivered_at' => 'datetime',
];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
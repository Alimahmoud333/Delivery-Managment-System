<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'pickup_address_id',
        'dropoff_address_id',
        'status',
        'price'
    ];

    protected $appends = ['has_rating'];

public function getHasRatingAttribute()
{
    return $this->rating()->exists();
}

    /* ================= RELATIONS ================= */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function rating()
    {
        return $this->hasOne(Rating::class);
    }

public function pickupAddress()
{
    return $this->belongsTo(Address::class,'pickup_address_id');
}

public function dropoffAddress()
{
    return $this->belongsTo(Address::class,'dropoff_address_id');
}
}
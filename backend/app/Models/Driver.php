<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = [
        'user_id',
        'vehicle_type',
        'license_number',
        'is_available'
    ];

    protected $casts = [
        'is_available' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
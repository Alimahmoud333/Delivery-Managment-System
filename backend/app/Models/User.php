<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
   use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name','email','password','role','phone','phone_verified'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    
protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
];



public function addresses()
{
    return $this->hasMany(Address::class);
}

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function driver()
    {
        return $this->hasOne(Driver::class);
    }


    /*
========================
SENT MESSAGES
========================
*/

public function sentMessages()
{
    return $this->hasMany(
        Message::class,
        'sender_id'
    );
}

/*
========================
RECEIVED MESSAGES
========================
*/

public function receivedMessages()
{
    return $this->hasMany(
        Message::class,
        'receiver_id'
    );
}



    
}
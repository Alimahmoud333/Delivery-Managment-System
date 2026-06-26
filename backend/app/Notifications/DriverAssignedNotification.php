<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DriverAssignedNotification extends Notification
{
    use Queueable;

    protected $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'driver_assigned',
            'title' => 'New Delivery Assigned',
            'message' => 'You have been assigned to Order ' . $this->order->id,
            'order_id' => $this->order->id,
            'pickup_address' => optional($this->order->pickupAddress)->street,
            'dropoff_address' => optional($this->order->dropoffAddress)->street,
        ];
    }
}
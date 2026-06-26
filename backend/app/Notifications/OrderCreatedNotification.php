<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderCreatedNotification extends Notification
{
    use Queueable;

    protected $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    /* Notification Channel */
    public function via($notifiable)
    {
        // Add 'mail' channel for email
        return ['database', 'mail'];
    }

    /* Email Notification */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('New Order Created')
                    ->greeting('Hello ' . ($notifiable->name ?? 'Customer') . '!')
                    ->line('A new order ' . $this->order->id . ' has been created.')
                    ->line('Total Price: $' . $this->order->price)
                    ->action('View Order', url('/orders/' . $this->order->id))
                    ->line('Thank you for using our application!');
    }

    /* Stored in notifications table */
    public function toArray($notifiable)
    {
        return [
            'type' => 'order_created',
            'title' => 'New Order Created',
            'message' => 'A new order ' . $this->order->id . ' has been created.',
            'order_id' => $this->order->id,
            'price' => $this->order->price,
            'created_by' => $this->order->user->name ?? null,
        ];
    }
}
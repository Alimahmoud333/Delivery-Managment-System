<?php

namespace App\Http\Controllers\Api\Manager;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Driver;
use App\Models\Delivery;
use App\Notifications\DriverAssignedNotification;

class ManagerOrderController extends Controller
{
    public function index()
    {
        return Order::with(
            'user',
            'items',
            'delivery.driver.user'
        )->latest()->get();
    }

public function assignDriver($orderId,$driverId)
{
    $order = Order::findOrFail($orderId);

    if($order->delivery){
        return response()->json([
            'message'=>'Order already assigned'
        ],400);
    }

    $driver = Driver::findOrFail($driverId);

    $delivery = Delivery::create([
        'order_id'=>$orderId,
        'driver_id'=>$driverId,
        'assigned_at'=>now(),
        'status'=>'assigned'
    ]);

    $order->update(['status'=>'accepted']);

    $driver->user->notify(
        new DriverAssignedNotification($order)
    );

    return $delivery;
}

    public function changeStatus($id,$status)
    {
        $order = Order::findOrFail($id);
        $order->update(['status'=>$status]);

        return $order;
    }

    public function deliveries()
    {
        return Delivery::with(
            'order.user',
            'driver.user'
        )->latest()->get();
    }
}
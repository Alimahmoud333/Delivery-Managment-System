<?php

namespace App\Http\Controllers\Api\Driver;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use Illuminate\Support\Facades\DB;
use App\Notifications\OrderStatusNotification;
use Illuminate\Http\Request;
class DriverWorkflowController extends Controller
{
private function driver()
{
    $driver = auth()->user()->driver;

    if(!$driver){
        abort(403, 'Driver profile not found');
    }

    return $driver;
}

    /*
    ===============================
    MY DELIVERIES
    ===============================
    */
public function myDeliveries()
{
    $driver = $this->driver();

    $deliveries = Delivery::query()
        ->where('driver_id', $driver->id)
        ->with([
            'order:id,user_id,pickup_address_id,dropoff_address_id,status',
            'order.user:id,name',
            'order.pickupAddress:id,city,street,lat,lng',
            'order.dropoffAddress:id,city,street,lat,lng'
        ])
        ->latest()
        ->get();

    return response()->json($deliveries);
}

    /*
    ===============================
    ACCEPT DELIVERY
    ===============================
    */
    
    public function accept($deliveryId)
    {
        $delivery = Delivery::where('id',$deliveryId)
            ->where('driver_id',$this->driver()->id)
            ->firstOrFail();

        if($delivery->status !== 'assigned'){
            return response()->json(['message'=>'Already accepted'],400);
        }

        DB::transaction(function () use ($delivery) {

            $delivery->update([
                'status' => 'accepted'
            ]);

            $delivery->order->update([
                'status' => 'accepted'
            ]);

            $delivery->driver->update([
                'is_available'=>false
            ]);

            $delivery->order->user->notify(
                new OrderStatusNotification(
                    $delivery->order,
                    'Driver accepted your order'
                )
            );
        });

        return ['message'=>'Delivery accepted'];
    }

    /*
    ===============================
    START DELIVERY
    ===============================
    */
    public function start($deliveryId)
    {
        $delivery = Delivery::where('id',$deliveryId)
            ->where('driver_id',$this->driver()->id)
            ->firstOrFail();

        if($delivery->status !== 'accepted'){
            return response()->json(['message'=>'Accept first'],400);
        }

        DB::transaction(function () use ($delivery){

            $delivery->update([
                'status'=>'in_transit',
                'picked_at'=>now()
            ]);

            $delivery->order->update([
                'status'=>'in_transit'
            ]);

            $delivery->order->user->notify(
                new OrderStatusNotification(
                    $delivery->order,
                    'Order is on the way'
                )
            );
        });

        return ['message'=>'Delivery started'];
    }

    /*
    ===============================
    DELIVERED
    ===============================
    */
    public function delivered($deliveryId)
    {
        $delivery = Delivery::where('id',$deliveryId)
            ->where('driver_id',$this->driver()->id)
            ->firstOrFail();

        if($delivery->status !== 'in_transit'){
            return response()->json(['message'=>'Not in transit'],400);
        }

        DB::transaction(function () use ($delivery){

            $delivery->update([
                'status'=>'delivered',
                'delivered_at'=>now()
            ]);

            $delivery->order->update([
                'status'=>'delivered'
            ]);

            $delivery->driver->update([
                'is_available'=>true
            ]);

            $delivery->order->user->notify(
                new OrderStatusNotification(
                    $delivery->order,
                    'Order delivered '
                )
            );
        });

        return ['message'=>'Delivered'];
    }

    /*
    ===============================
    ONLINE / OFFLINE
    ===============================
    */
    public function toggleAvailability()
    {
        $driver = $this->driver();

        $driver->update([
            'is_available'=>!$driver->is_available
        ]);

        return [
            'available'=>$driver->is_available
        ];
    }


    public function updateProfile(Request $request)
{
    $driver = auth()->user()->driver; // get driver profile

    $data = $request->validate([
        'vehicle_type' => 'required|string',
        'license_number' => 'required|string',
    ]);

    $driver->update($data);

    return response()->json($driver);
    
}
}
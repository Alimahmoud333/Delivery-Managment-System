<?php

namespace App\Http\Controllers\Api\Customer;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Notifications\OrderCreatedNotification;

use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /* =========================================
       LIST USER ORDERS
    ========================================= */

    public function index()
    {
        return auth()->user()
            ->orders()
            ->with(
                'items',
                'delivery.driver.user',
                'payment',
                'pickupAddress',
                'dropoffAddress',
                'rating'
            )
            ->latest()
            ->get();
    }

    /* =========================================
       CREATE ORDER
    ========================================= */
public function store(Request $request)
{
    $data = $request->validate([
        'pickup_address_id' => 'required|exists:addresses,id',
        'dropoff_address_id' => 'required|exists:addresses,id',
        'price' => 'required|numeric|min:0',

        'items' => 'required|array|min:1',
        'items.*.item_name' => 'required|string',
        'items.*.quantity' => 'required|integer|min:1'
    ]);

    // ================================
    // ADDRESS OWNERSHIP CHECK
    // ================================

    Address::where('id', $data['pickup_address_id'])
        ->where('user_id', auth()->id())
        ->firstOrFail();

    Address::where('id', $data['dropoff_address_id'])
        ->where('user_id', auth()->id())
        ->firstOrFail();

    DB::beginTransaction();

    try {

        // ================================
        // SEARCH EXISTING OPEN ORDER
        // ================================

        $existingOrder = Order::where('user_id', auth()->id())

            ->where('pickup_address_id', $data['pickup_address_id'])

            ->where('dropoff_address_id', $data['dropoff_address_id'])

            ->whereIn('status', [
                'pending',
                'accepted',
            ])

            ->where('created_at', '>=', now()->subHours(24))

            ->latest()

            ->first();

        // ================================
        // IF ORDER EXISTS
        // ================================

        if ($existingOrder) {

            foreach ($data['items'] as $item) {

                // check if item already exists
                $existingItem = OrderItem::where('order_id', $existingOrder->id)
                    ->where('item_name', $item['item_name'])
                    ->first();

                if ($existingItem) {

                    // increase quantity
                    $existingItem->increment(
                        'quantity',
                        $item['quantity']
                    );

                } else {

                    // create new item
                    OrderItem::create([
                        'order_id' => $existingOrder->id,
                        'item_name' => $item['item_name'],
                        'quantity' => $item['quantity']
                    ]);
                }
            }

            // update total price
            $existingOrder->increment('price', $data['price']);

            DB::commit();

            return response()->json([
                'message' => 'Items added to existing order',
                'order' => $existingOrder->load('items')
            ]);
        }

        // ================================
        // CREATE NEW ORDER
        // ================================

        $order = Order::create([
            'user_id' => auth()->id(),

            'pickup_address_id' => $data['pickup_address_id'],

            'dropoff_address_id' => $data['dropoff_address_id'],

            'price' => $data['price'],

            'status' => 'pending'
        ]);

        // create items
        foreach ($data['items'] as $item) {

            OrderItem::create([
                'order_id' => $order->id,

                'item_name' => $item['item_name'],

                'quantity' => $item['quantity']
            ]);
        }

        auth()->user()->notify(
            new OrderCreatedNotification($order)
        );

        DB::commit();

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load('items')
        ]);

    } catch (\Exception $e) {

        DB::rollBack();

        return response()->json([
            'message' => 'Server Error',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /* =========================================
       SHOW SINGLE ORDER
    ========================================= */

    public function show($id)
    {
        return auth()->user()
            ->orders()
            ->with(
                'items',
                'delivery.driver.user',
                'pickupAddress',
                'dropoffAddress',
                'payment',
                'rating'
            )
            ->findOrFail($id);
    }

    /* =========================================
       CANCEL ORDER
    ========================================= */

public function cancel($id)
{
    $order = auth()->user()
        ->orders()
        ->findOrFail($id);

    if (!in_array($order->status, ['pending', 'accepted'])) {
        return response()->json([
            'message' => 'Cannot cancel this order'
        ], 400);
    }

    $order->update([
        'status' => 'canceled'
    ]);

    return response()->json($order);
}
}
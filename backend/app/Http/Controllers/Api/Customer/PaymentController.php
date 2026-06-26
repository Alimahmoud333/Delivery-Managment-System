<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Payment;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function createIntent(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        $order = Order::findOrFail($request->order_id);

        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->payment && $order->payment->status === 'paid') {
            return response()->json([
                'message' => 'Already paid'
            ], 400);
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        $intent = PaymentIntent::create([
            'amount' => (int) ($order->price * 100),
            'currency' => 'usd',
            'metadata' => [
                'order_id' => $order->id,
                'user_id' => auth()->id()
            ]
        ]);

        // إنشاء payment record
        Payment::updateOrCreate(
            ['order_id' => $order->id],
            [
                'user_id' => auth()->id(),
                'amount' => $order->price,
                'transaction_id' => $intent->id,
                'status' => 'pending'
            ]
        );

        return response()->json([
            'client_secret' => $intent->client_secret
        ]);
    }
}
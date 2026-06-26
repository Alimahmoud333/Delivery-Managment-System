<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Order;
use App\Notifications\PaymentPaidNotification;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent(
                $payload,
                $signature,
                config('services.stripe.webhook_secret')
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'payment_intent.succeeded') {

            $intent = $event->data->object;

            $payment = Payment::where('transaction_id', $intent->id)->first();

            if (!$payment) {
                return response()->json(['error' => 'Payment not found'], 404);
            }

         
            if ($payment->status === 'paid') {
                return response()->json(['message' => 'Already processed']);
            }

            $payment->update([
                'status' => 'paid'
            ]);

            $order = Order::findOrFail($payment->order_id);

            $order->update([
                'status' => 'paid'
            ]);

$order->user->notify(
    new PaymentPaidNotification($order)
);

        }

        return response()->json(['success' => true]);
    }
}
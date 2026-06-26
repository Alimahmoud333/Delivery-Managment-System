<?php

namespace App\Http\Controllers\Api\Customer;

use App\Models\Rating;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RatingController extends Controller
{
public function rate(Request $request)
{
    $exists = Rating::where('order_id', $request->order_id)
        ->where('user_id', auth()->id())
        ->exists();

    if ($exists) {
        return response()->json([
            'message' => 'You already rated this order'
        ], 400);
    }

    return Rating::create([
        'order_id' => $request->order_id,
        'user_id' => auth()->id(),
        'driver_id' => $request->driver_id,
        'rating' => $request->rating,
        'comment' => $request->comment
    ]);
}
}
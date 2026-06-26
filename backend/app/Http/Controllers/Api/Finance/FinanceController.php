<?php

namespace App\Http\Controllers\Api\Finance;

use App\Http\Controllers\Controller;
use App\Models\Payment;

class FinanceController extends Controller
{
public function payments()
{
    return Payment::with('order.user', 'order.items')
        ->latest()
        ->get();
}
    public function revenue()
    {
        return [
            'total_revenue' =>
                Payment::where('status','paid')->sum('amount'),

            'total_transactions' =>
                Payment::where('status','paid')->count()
        ];
    }
}
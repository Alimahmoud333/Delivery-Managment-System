<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Rating;
use App\Models\User;
use App\Models\Driver;
use App\Models\Delivery;
use Illuminate\Support\Facades\DB;

class AdminOrderController extends Controller
{
    /*
    =================================
    ALL ORDERS
    =================================
    */
    public function index()
    {
        return Order::with([
            'user',
            'items',
            'delivery.driver.user',
            'payment'
        ])->latest()->get();
    }

    /*
    =================================
    RATINGS LIST
    =================================
    */
    public function ratings()
    {
        return Rating::with(
            'driver.user',
            'user',
            'order'
        )->latest()->get();
    }

    /*
    =================================
    DASHBOARD STATS (CARDS)
    =================================
    */
    public function stats()
    {
        return [
            'orders' => Order::count(),
            'pending' => Order::where('status','pending')->count(),
            'delivered' => Order::where('status','delivered')->count(),
            'drivers' => Driver::count(),
            'customers' => User::where('role','customer')->count(),
        ];
    }

    /*
    ===============================
    ORDERS BY STATUS
    ===============================
    */
    public function ordersByStatus()
    {
        return Order::select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->get();
    }

    /*
    ===============================
    BEST RATED DRIVERS
    ===============================
    */
    public function bestDrivers()
    {
        return Rating::select(
                'driver_id',
                DB::raw('AVG(rating) as avg_rating')
            )
            ->with('driver.user')
            ->groupBy('driver_id')
            ->orderByDesc('avg_rating')
            ->take(5)
            ->get()
            ->map(function ($r) {
                return [
                    'driver' => $r->driver->user->name,
                    'rating' => round($r->avg_rating, 2),
                ];
            });
    }

    /*
    ===============================
    DRIVERS WITH MOST ORDERS
    ===============================
    */
    public function topDriversByOrders()
    {
        return Delivery::select(
                'driver_id',
                DB::raw('COUNT(*) as total_orders')
            )
            ->with('driver.user')
            ->groupBy('driver_id')
            ->orderByDesc('total_orders')
            ->take(5)
            ->get()
            ->map(function ($d) {
                return [
                    'driver' => $d->driver->user->name,
                    'orders' => $d->total_orders,
                ];
            });
    }
}
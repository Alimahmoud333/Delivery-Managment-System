<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Driver;

class AdminDriverController extends Controller
{
    public function index()
    {
        return Driver::with('user')->get();
    }

    public function toggleAvailability($id)
    {
        $driver = Driver::findOrFail($id);

        $driver->update([
            'is_available'=>!$driver->is_available
        ]);

        return $driver->fresh('user');
    }
}
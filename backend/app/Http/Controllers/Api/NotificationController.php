<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    public function index()
    {
        return auth()->user()->notifications()->latest()->get();
    }

    public function markRead($id)
    {
        $notification = auth()
            ->user()
            ->notifications()
            ->findOrFail($id);

        $notification->markAsRead();

        return ['message'=>'Marked as read'];
    }
}
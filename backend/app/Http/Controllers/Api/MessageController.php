<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Message;
use App\Models\User;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    /*
    ===================================
    USERS
    ===================================
    */

    public function users()
    {
        return User::where(
            'id',
            '!=',
            auth()->id()
        )
        ->select(
            'id',
            'name',
            'role'
        )
        ->get();
    }

    /*
    ===================================
    ALL MY MESSAGES
    ===================================
    */

    public function index()
    {
        return Message::where(
            'sender_id',
            auth()->id()
        )
        ->orWhere(
            'receiver_id',
            auth()->id()
        )
        ->with([
            'sender',
            'receiver'
        ])
        ->latest()
        ->get();
    }

    /*
    ===================================
    CONVERSATION
    ===================================
    */

    public function conversation($userId)
    {
        $messages = Message::where(
            function ($q) use ($userId) {

                $q->where(
                    'sender_id',
                    auth()->id()
                )
                ->where(
                    'receiver_id',
                    $userId
                );
            }
        )
        ->orWhere(
            function ($q) use ($userId) {

                $q->where(
                    'sender_id',
                    $userId
                )
                ->where(
                    'receiver_id',
                    auth()->id()
                );
            }
        )
        ->with([
            'sender',
            'receiver'
        ])
        ->orderBy('created_at')
        ->get();

        /*
        mark seen
        */

        Message::where(
            'sender_id',
            $userId
        )
        ->where(
            'receiver_id',
            auth()->id()
        )
        ->where(
            'is_seen',
            false
        )
        ->update([
            'is_seen' => true,
            'seen_at' => now(),
        ]);

        return $messages;
    }

    /*
    ===================================
    STORE MESSAGE
    ===================================
    */

    public function store(Request $request)
    {
        $request->validate([

            'receiver_id' =>
                'required|exists:users,id',

            'message' =>
                'nullable|string',

            'type' =>
                'required|in:text,image,video,file,location',

            'file' =>
                'nullable|file|max:51200',

            'latitude' =>
                'nullable|numeric',

            'longitude' =>
                'nullable|numeric',
        ]);

        $filePath = null;

        /*
        upload file
        */

        if ($request->hasFile('file')) {

            $filePath = $request
                ->file('file')
                ->store(
                    'messages',
                    'public'
                );
        }

        $message = Message::create([

            'sender_id' =>
                auth()->id(),

            'receiver_id' =>
                $request->receiver_id,

            'message' =>
                $request->message,

            'type' =>
                $request->type,

            'file' =>
                $filePath,

            'latitude' =>
                $request->latitude,

            'longitude' =>
                $request->longitude,
        ]);

        return $message->load([
            'sender',
            'receiver'
        ]);
    }

    /*
    ===================================
    DELETE MESSAGE
    ===================================
    */

    public function destroy($id)
    {
        $message = Message::where(
            'id',
            $id
        )
        ->where(
            'sender_id',
            auth()->id()
        )
        ->firstOrFail();

        $message->delete();

        return response()->json([
            'message' =>
                'Message deleted'
        ]);
    }
}
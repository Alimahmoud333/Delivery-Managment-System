<?php

namespace App\Http\Controllers\Api;

use Twilio\Rest\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
class OtpController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'phone' => 'required'
        ]);

        $twilio = new Client(
            env('TWILIO_SID'),
            env('TWILIO_TOKEN')
        );

        $twilio->verify->v2
            ->services(env('TWILIO_VERIFY_SERVICE'))
            ->verifications
            ->create($request->phone, "sms");

        return response()->json([
            'message' => 'OTP sent'
        ]);
    }

    public function verify(Request $request)
{
    $request->validate([
        'phone' => 'required',
        'code' => 'required'
    ]);

    $twilio = new Client(
        env('TWILIO_SID'),
        env('TWILIO_TOKEN')
    );

    $verification = $twilio->verify->v2
        ->services(env('TWILIO_VERIFY_SERVICE'))
        ->verificationChecks
        ->create([
            "to" => $request->phone,
            "code" => $request->code
        ]);

    if ($verification->status === "approved") {

       $user = User::where('phone', $request->phone)->first();

        $user->update([
            'phone_verified' => true
        ]);

        return response()->json([
            'message' => 'Phone verified'
        ]);
    }

    return response()->json([
        'message' => 'Invalid OTP'
    ], 400);
}
}
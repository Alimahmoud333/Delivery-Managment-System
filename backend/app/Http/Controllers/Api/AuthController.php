<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /* ================= REGISTER ================= */
//     public function register(Request $request)
// {
//     $data = $request->validate([
//         'name'     => 'required|string|max:255',
//         'email'    => 'required|email|unique:users,email',
//         'password' => 'required|min:6|confirmed',
//         'role'     => 'required|in:customer,driver,admin,finance,manager',
//         'phone'    => 'required|string'
//     ]);

//     $data['password'] = Hash::make($data['password']);

//     $user = User::create($data);

// if ($user->role === 'driver') {
//     Driver::create([
//         'user_id' => $user->id,
//         'vehicle_type' => 'unknown',
//         'license_number' => 'unknown',
//         'is_available' => true
//     ]);
// }

//     $token = $user->createToken('api')->plainTextToken;

//     return response()->json([
//         'status'=>true,
//         'message'=>'Register successful',
//         'user'=>$user->load('driver'), // مهم
//         'token'=>$token
//     ],201);
// }
//     /* ================= LOGIN ================= */
//     public function login(Request $request)
//     {
//         $request->validate([
//             'email'=>'required|email',
//             'password'=>'required'
//         ]);

//         $user = User::where('email',$request->email)->first();

//         if(!$user || !Hash::check($request->password,$user->password)){
//             return response()->json([
//                 'status'=>false,
//                 'message'=>'Invalid credentials'
//             ],401);
//         }

//         $token = $user->createToken('api')->plainTextToken;

//         return response()->json([
//             'status'=>true,
//             'message'=>'Login successful',
//             'user'=>$user,
//             'token'=>$token
//         ]);
//     }


public function register(Request $request)
{
    $data = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
        'role'     => 'required|in:customer,driver,admin,finance,manager',
        'phone'    => 'required|string|unique:users,phone'
    ]);

    $data['password'] = Hash::make($data['password']);

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => $data['password'],
        'role' => $data['role'],
        'phone' => $data['phone'],
        'phone_verified' => false
    ]);

    if ($user->role === 'driver') {

        Driver::create([
            'user_id' => $user->id,
            'vehicle_type' => 'unknown',
            'license_number' => 'unknown',
            'is_available' => true
        ]);
    }

    /*
    ===================================
    SEND OTP AUTOMATICALLY
    ===================================
    */

    $twilio = new \Twilio\Rest\Client(
        env('TWILIO_SID'),
        env('TWILIO_TOKEN')
    );

    $twilio->verify->v2
        ->services(env('TWILIO_VERIFY_SERVICE'))
        ->verifications
        ->create($user->phone, "sms");

    return response()->json([
        'status' => true,
        'message' => 'Account created successfully. OTP sent to your phone.',
        'user_id' => $user->id,
        'phone' => $user->phone
    ], 201);
}




public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {

        return response()->json([
            'status' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    if (!$user->phone_verified) {

        return response()->json([
            'status' => false,
            'message' => 'Phone number not verified',
            'user_id' => $user->id,
            'phone' => $user->phone
        ], 403);
    }

    $token = $user->createToken('api')->plainTextToken;

    return response()->json([
        'status' => true,
        'message' => 'Login successful',
        'user' => $user->load('driver'),
        'token' => $token
    ]);
}
    /* ================= PROFILE ================= */
    public function profile()
    {
        return response()->json([
            'status'=>true,
            'data'=>auth()->user()->load('driver')
        ]);
    }

    /* ================= LOGOUT ================= */
    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'status'=>true,
            'message'=>'Logged out'
        ]);
    }
}
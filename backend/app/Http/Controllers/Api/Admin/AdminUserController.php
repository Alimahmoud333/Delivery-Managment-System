<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        return User::with('driver')->latest()->get();
    }

    public function show($id)
    {
        return User::with('driver','orders')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'phone'=>'required',
            'role'=>'required',
            'password'=>'required|min:6'
        ]);

        $data['password']=Hash::make($data['password']);
            $data['phone_verified'] = true; 

        $user = User::create($data);

        if($user->role === 'driver'){
            Driver::create([
                'user_id'=>$user->id,
                'vehicle_type'=>$request->vehicle_type,
                'license_number'=>$request->license_number,
                'is_available'=>true
            ]);
        }

        return $user->load('driver');
    }

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $data = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email,' . $id,
        'phone' => 'required',
        'role' => 'required',
        'password' => 'nullable|min:6',
        'vehicle_type' => 'nullable|string',
        'license_number' => 'nullable|string',
    ]);

    if (!empty($data['password'])) {
        $data['password'] = Hash::make($data['password']);
    } else {
        unset($data['password']);
    }

    $user->update($data);

    // DRIVER handling
    if ($data['role'] === 'driver') {
        Driver::updateOrCreate(
            ['user_id' => $user->id],
            [
                'vehicle_type' => $request->vehicle_type,
                'license_number' => $request->license_number,
                'is_available' => true
            ]
        );
    } else {
        $user->driver()?->delete();
    }

    return $user->load('driver');
}

public function destroy($id)
{
    try {
        $user = User::findOrFail($id);

        $user->orders()->delete();
        $user->addresses()->delete();

        if ($user->driver) {
            $user->driver()->delete();
        }

        $user->delete();

        return ['message'=>'User deleted'];

    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
}
}
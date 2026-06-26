<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->addresses;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'city'=>'required|string',
            'street'=>'required|string',
            'lat'=>'nullable|numeric',
            'lng'=>'nullable|numeric'
        ]);

        $data['user_id'] = auth()->id();

        return Address::create($data);
    }

    public function destroy($id)
    {
        Address::where('id',$id)
            ->where('user_id',auth()->id())
            ->firstOrFail()
            ->delete();

        return response()->json(['message'=>'Address deleted']);
    }
}
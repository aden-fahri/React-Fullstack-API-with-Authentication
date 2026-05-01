<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function register(Request $request){
        $validate = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        $validate['password'] = Hash::make($request->password);

        $users = User::create($validate);
        $token = $users->createToken($request->name);

        return [
            'user' => $users,
            'token' => $token->plainTextToken
        ];
    }

    function login(Request $request){
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'error' => ['email' => 'The provided credentials are incorrect.']
            ];
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
    
    function logout(Request $request){
        $request->user()->tokens()->delete();

        return [
            'message' => 'Logged out successfully'
        ];
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function create(Request $request){
        // dd($request);
        $validator = $request->validate([
            'name'=>'required',
            'surname'=>'required',
            'email'=>'required|unique:users|email',
            'password'=>'required|min:8',
        ]);
       


        $user = User::create([
            'name'=>$request->name,
            'surname'=>$request->surname,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);



        $token=$user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status'=>200,
            'email'=>$user->email,
            'username'=>$user->full_name,
            'token'=>$token,
            'message'=>"Kayıt başarılı.",
        ]);

    }
}

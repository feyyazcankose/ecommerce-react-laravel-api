<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
  


    public function register(Request $request)
    {

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

    public function login(Request $request)
    {
        $validator = $request->validate([
            'email'=>'required|email',
            'password'=>'required|min:8',
        ]);
       


        $user = User::where('email',$request->email)->first();


        if(isset($user->password)!=null)
        {

            if(Hash::check($request->password,$user->password))
            {
                $token=$user->createToken($user->email.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'email'=>$user->email,
                    'username'=>$user->full_name,
                    'token'=>$token,
                    'message'=>"Kayıt başarılı.",
                ]);

            }


            return response()->json([
                'error'=>"Şifre hatalı!",
            ]);
           
        }
        

        return response()->json([
            'error'=>"E posta hatalı!",
        ]);



    }
    
    public function logout(){
        auth()->user()->tokens()->delete();

        return response()->json([
            'status'=>200,
            'message'=>"Çıkış Başarılı",
        ]);

    }
}

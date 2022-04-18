<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        // dd($request);

        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'surname'=>'required',
            'email'=>'required|unique:users|email',
            'password'=>'required|min:8',
        ]);
        



 
        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
            ]);

        }
        


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



    public function login(Request $request) {
        $validator = Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required|min:8',
        ]);
        



 
        if($validator->fails())
        {
            return response()->json([
                'validation_error'=>$validator->messages(),
            ]);

        }

        $user=User::where('email',$request->email)->first();


        if(isset($user->password)==null)
        {
            return response()->json([
                'validation_error'=>[],
                'error'=>"E posta adresi kayıtlı değil !",
            ]);
        }

        if(Hash::check($request->password,$user->password)){
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
            'validation_error'=>[],
            'error'=>"Parola hatalı !",
        ]);



        

    }



    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>"Çıkış işlemi başarılı"
        ]);
    }
}

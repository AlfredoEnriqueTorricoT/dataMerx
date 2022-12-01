<?php

namespace App\Http;



class Res
{
    public static $messageNotPermission = "You don't have permission";
    public static $messagePermissionNotExist = "Permission does not exist";

    public static function responseSuccess($data){
        return response()->json([
            "status" => 200,
            "message" => "success",
            "data" => $data
        ], 200);
    }

    public static function responseSuccessConfirm($message, $data){
        return response()->json([
            "status" => 232,
            "message" => $message,
            "data" => $data,
        ], 200);
    }

    public static function responseSuccessCreated($data){
        return response()->json([
            "status" => 200,
            "message" => "success",
            "data" => $data
        ], 201);
    }

    public static function responseSuccessDelete(){
        return response()->json([
            "status" => 204,
            "message" => "success"
        ], 200);
    }

    public static function responseError($error){
        return response()->json([
            "status" => 400,
            "message" => $error
        ], 400);
    }

    public static function responseError432($message, $data){
        return response()->json([
            "status" => 432,
            "message" => $message,
            "data" => $data
        ], 432);
    }

    public static function responseErrorNoId(){
        return response()->json([
            "status" => 500,
            "message" => "There is no id"
        ], );
    }

    public static function responseErrorNoData(){
        return response()->json([
            "status" => 400,
            "message" => "no data"
        ], 200);
    }

    public static function responseErrorWithData($message, $data){
        return response()->json([
            "status" => 400,
            "message" => $message,
            "data" => $data,
        ], 400);
    }

    public static function responseErrorValidate($data){
        return response()->json([
            "status" => 400,
            "message" => "Validate",
            "data" => $data,
        ], 400);
    }

    public static function responseErrorUnauthenticated(){
        return response()->json([
            "status" => 401,
            "message" => "Unauthenticated"
        ], 200);
    }
}

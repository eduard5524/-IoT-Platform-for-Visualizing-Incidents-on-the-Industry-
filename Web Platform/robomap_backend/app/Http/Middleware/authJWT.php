<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class authJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     * @throws Exception
     */
    public function handle($request, Closure $next)
    {
        try {
            $token = JWTAuth::getToken();
            JWTAuth::toUser($token); //serà el que faci saltar l'excepció
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException){
                return response()->json(["msg" => "Token is Invalid"])->setStatusCode(401);
            } else if ($e instanceof TokenExpiredException){
                return response()->json(["msg" => "Token is Expired"])->setStatusCode(401);
            } else if ($e instanceof JWTException) {
                return response()->json(["msg" => "Token is Missing"])->setStatusCode(401);
            } else {
                return response()->json(["msg" => "Something is wrong"])->setStatusCode(401);
            }
        }
        return $next($request);
    }
}

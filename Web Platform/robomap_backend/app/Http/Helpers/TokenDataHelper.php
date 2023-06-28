<?php
/**
 * Created by PhpStorm.
 * User: Projectes
 * Date: 11/02/2019
 * Time: 13:39
 */

namespace App\Http\Helpers;

use Tymon\JWTAuth\Facades\JWTAuth;

class TokenDataHelper
{
    public static function getUserIdFromToken() {
        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token);
        return $payload->get(TOKEN_USER_ID);
    }

    public static function getUserEmailFromToken() {
        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token);
        return $payload->get(TOKEN_USER_EMAIL);
    }

    public static function getCompanyIdFromToken() {
        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token);
        return $payload->get(TOKEN_COMPANY_ID);
    }

    public static function getRoleIdFromToken() {
        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token);
        return $payload->get(TOKEN_ROLE_ID);
    }
}
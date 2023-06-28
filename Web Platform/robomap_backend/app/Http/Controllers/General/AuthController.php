<?php

namespace App\Http\Controllers\General;

use App\User;
use App\UserCompanyRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    const PASSWORD_MIN_LENGTH = 6;
    protected $connection = 'db_neuracore';
    /**
     * @OA\POST(
     *     path="/auth/login",
     *     operationId="login",
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="admin"
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      type="string",
     *                      default="admin123"
     *                  ),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="token",
     *                      type="string",
     *                      example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsInN1YiI6MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNTQ5MzY3ODM2LCJleHAiOjE1NDkzNjc4OTYsIm5iZiI6MTU0OTM2NzgzNiwianRpIjoiN1hzS3laYmU2bE1QaTVueSJ9.xJAEhfKneac8egOXl7hAa-BmpjIhsTu9Cjtk94BcvfU"
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=400,
     *          description="Wrong parameters",
     *     ),
     *     @OA\Response(
     *          response=401,
     *          description="Invalid credentials",
     *     ),
     * )
     */
    public function login()
    {

        $email = Input::get('email');
        $password = Input::get('password');
        if ($email == null || $password == null){
            return response(null, CODE_BAD_REQUEST);
        }

        $user = User::where('email', '=', $email)->first();
        if (!isset($user) || !Auth::attempt(['email' => $user->email, 'password' => $password])) {
            return response()->json(["msg" => "Invalid credentials"])->setStatusCode(CODE_UNAUTHORIZED);
        }

        $selection = UserCompanyRole::where('user_id', '=', $user->id)->first();

        //Token claims
        $customClaims = [
            TOKEN_USER_ID => $user->id,
            TOKEN_USER_EMAIL => $user->email,
            TOKEN_ROLE_ID => isset($selection) ? $selection->role_id : null,
            TOKEN_ROLE_NAME => isset($selection) && isset($selection->roles) ? $selection->roles->name : null,
            TOKEN_COMPANY_ID => isset($selection) ? $selection->company_id : null,
        ];
        if (!$token = JWTAuth::fromUser($user, $customClaims)) {
            return response()->json(["msg" => "Invalid credentials"])->setStatusCode(CODE_UNAUTHORIZED);
        }

        return response()->json(["token" => $token])->setStatusCode(CODE_OK);
    }

    /**
     * @OA\POST(
     *     path="/auth/refresh",
     *     operationId="refresh token",
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="token",
     *                      type="string",
     *                      default="{{token}}"
     *                  ),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="token",
     *                      type="string",
     *                      example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbiIsInN1YiI6MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNTQ5MzY3ODM2LCJleHAiOjE1NDkzNjc4OTYsIm5iZiI6MTU0OTM2NzgzNiwianRpIjoiN1hzS3laYmU2bE1QaTVueSJ9.xJAEhfKneac8egOXl7hAa-BmpjIhsTu9Cjtk94BcvfU"
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=401,
     *          description="Invalid or Missing token",
     *     ),
     * )
     */
    public function refreshToken() {
        $token = Input::get('token');
        if (!isset($token)) {
            return response(null, CODE_BAD_REQUEST);
        }

        try {
            JWTAuth::toUser($token); //serà el que faci saltar l'excepció

        } catch (TokenInvalidException $e) {
            return response()->json(["msg" => "Token is Invalid"])->setStatusCode(CODE_UNAUTHORIZED);

        } catch (TokenExpiredException $e) {
            //No caldrà fer res en aquest catch, ja que caldrà refrescar el token que ja es fa més endavant

        } catch (\Exception $e) {
            return response()->json(["msg" => "Something is wrong"])->setStatusCode(CODE_UNAUTHORIZED);
        }

        try {
            $refreshed = JWTAuth::refresh($token);
            $user = JWTAuth::setToken($refreshed)->toUser();
            $payload = JWTAuth::getPayload($refreshed)->toArray();
           // $company_id = $payload['company_id'];

            $selection = UserCompanyRole::where([['user_id', '=', $user->id]])->first();

            //Token claims
            $customClaims = [
                TOKEN_USER_ID => $user->id,
                TOKEN_USER_EMAIL => $user->email,
                TOKEN_ROLE_ID => isset($selection) ? $selection->role_id : null,
                TOKEN_ROLE_NAME => isset($selection) && isset($selection->roles) ? $selection->roles->name : null,
                TOKEN_COMPANY_ID => isset($selection) ? $selection->company_id : null,
            ];

            $token = JWTAuth::fromUser($user, $customClaims);
            return response()->json(["token" => $token])->setStatusCode(CODE_OK);

        } catch (TokenBlacklistedException $e2) {
            return response()->json(["msg" => "Token is Invalid"])->setStatusCode(CODE_UNAUTHORIZED);
        }

    }

    /**
     * @OA\Put(
     *     path="/auth/password",
     *     description="Edits the password of the user with the specified id",
     *     operationId="edit password",
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="id",
     *                      type="number",
     *                      default=21
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      type="string",
     *                      default="newpassword"
     *                  ),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="User not found",
     *     ),
     *     @OA\Response(
     *          response=400,
     *          description="No password or password too short",
     *     ),
     * ),
     */
    public function changePassword() {
        $id = Input::get('id');
        $user = User::find($id);
        if (!isset($user)) {
            return response(null, CODE_NOT_FOUND);
        }

        $password = Input::get('password');
        if($password == null || strlen($password) < AuthController::PASSWORD_MIN_LENGTH) {
            return response(null, CODE_BAD_REQUEST);
        }

        $user->password = Hash::make($password);;

        if ($user->save()) {
            return response(null, CODE_OK);
        }
        return response(null, CODE_SERVER_ERROR);

    }

    public function changeCompany() {
        $id = Input::get('id');
        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token)->toArray();
        $user_id = $payload['user_id'];
        $selection = UserCompanyRole::where([['user_id', '=', $user_id]])->first();
        if (isset($selection)) {
            $user = User::find($user_id);
            if (!isset($user)) {
                return response(null, CODE_FORBIDDEN);
            }
            //Token claims
            $customClaims = [
                TOKEN_USER_ID => $user->id,
                TOKEN_USER_EMAIL => $user->email,
                TOKEN_ROLE_ID => isset($selection) ? $selection->role_id : null,
                TOKEN_ROLE_NAME => isset($selection) && isset($selection->roles) ? $selection->roles->name : null,
                TOKEN_COMPANY_ID => isset($selection) ? $selection->company_id : null,
            ];

            $token = JWTAuth::fromUser($user, $customClaims);
            return response()->json(["token" => $token])->setStatusCode(CODE_OK);
        } else {
            return response(null, CODE_FORBIDDEN);
        }
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Tymon\JWTAuth\Facades\JWTAuth;

define('CODE_OK', 200);
define('CODE_NO_CONTENT', 204);
define('CODE_BAD_REQUEST', 400);
define('CODE_UNAUTHORIZED', 401);
define('CODE_FORBIDDEN', 403);
define('CODE_NOT_FOUND', 404);
define('CODE_CONFLICT', 409);
define('CODE_SERVER_ERROR', 500);
define('CODE_NOT_IMPLEMENTED', 501);

define('TOKEN_USER_ID', 'user_id');
define('TOKEN_USER_EMAIL', 'user_email');
define('TOKEN_COMPANY_ID', 'company_id');
define('TOKEN_ROLE_ID', 'role_id');
define('TOKEN_ROLE_NAME', 'role_name');

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

}

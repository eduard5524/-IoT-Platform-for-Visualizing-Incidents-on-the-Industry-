<?php

namespace App\Http\Controllers\General;

use App\Http\Helpers\TokenDataHelper;
use App\Role;
use App\User;
use App\UserCompanyRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class UsersController extends Controller
{

    /**
     * @param $companyId integer amb l'identificador de la companyia a la que pertany l'usuari
     */
    public function getCompanyUsers($companyId, $userId = null) {

      /*  $users = User::with(['roles' => function($q) use($companyId) {
            $q->wherePivot('company_id' , '=' , $companyId);
        }])->whereHas('companies', function ($query) use($companyId) {
            $query->where('companies.id', '=', $companyId);
        });*/

        if (isset($userId)) {
            $users->where('users.id', '=', $userId);
            return $users;
        }

        return $users;
    }

    /**
     * @OA\Get(
     *     path="/users",
     *     description="Returns a list with all registered users that meet the parameters requirements",
     *     operationId="get users",
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *     ),
     * ),
     */
    public function getUsers()
    {
        $users = $this->getCompanyUsers(TokenDataHelper::getCompanyIdFromToken())->get();
        return response()->json($users)->setStatusCode(CODE_OK);
    }

    /**
     * @OA\Get(
     *     path="/users/{id}",
     *     description="Returns the specified user",
     *     operationId="get user",
     *     @OA\Parameter(
     *          name="Authorization",
     *          in="header",
     *          required=true,
     *          description="Access token",
     *          @OA\Schema(
     *              default="bearer {{token}}"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="User id",
     *          @OA\Schema(
     *              type="number",
     *              default=21
     *          ),
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="id",
     *                      type="number",
     *                      default=1,
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="user@email.com",
     *                  ),
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="name",
     *                  ),
     *                  @OA\Property(
     *                      property="surname",
     *                      type="string",
     *                      default="surname",
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="123456789",
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="User not found",
     *     ),
     * ),
     */
    public function getUser($id) {
        if (isset($id)) {
            $user_check = User::find($id);
            if (!isset($user_check)) {
                return response(null, CODE_NOT_FOUND);
            }
            $user = $this->getCompanyUsers(TokenDataHelper::getCompanyIdFromToken(), $id)->first();
            if (!isset($user)) {
                //només es podrà obtenir les companyies de l'usuari, sino 403
                return response(null, CODE_FORBIDDEN);
            }

            return response()->json($user)->setStatusCode(CODE_OK);
        } else {
            return response(null, CODE_BAD_REQUEST);
        }
    }

    public function getUserData($id) {
        if (isset($id)) {
            $user = User::find($id);
            if (!isset($user)) {
                return response(null, CODE_NOT_FOUND);
            }

            return response()->json($user)->setStatusCode(CODE_OK);
        } else {
            return response(null, CODE_BAD_REQUEST);
        }
    }

    /**
     * @OA\Put(
     *     path="/users",
     *     description="Edits the user with the specified id",
     *     operationId="edit user",
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
     *                      property="email",
     *                      type="string",
     *                      default="new_email@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="New Name"
     *                  ),
     *                  @OA\Property(
     *                      property="surname",
     *                      type="string",
     *                      default="New Surname"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="987654321"
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
     *                      property="id",
     *                      type="number",
     *                      default=21
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="new_email@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="New Name"
     *                  ),
     *                  @OA\Property(
     *                      property="surname",
     *                      type="string",
     *                      default="New Surname"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="987654321"
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="User not found",
     *     ),
     * ),
     */
    public function editUser() {
        $id = Input::get('id');
        $user_check = User::find($id);
        if (!isset($user_check)) {
            return response(null, CODE_NOT_FOUND);
        }
        $user = $this->getCompanyUsers(TokenDataHelper::getCompanyIdFromToken(), $id)->first();
        if (!isset($user)) {
            //només es podrà obtenir les companyies de l'usuari, sino 403
            return response(null, CODE_FORBIDDEN);
        }

        $name = Input::get('name');
        $surname = Input::get('surname');
        $email = Input::get('email');
        $phone = Input::get('phone');

        if (isset($email)) {
            $user_email = DB::table('users')->where(['email' => $email])->where('id', '!=', $id)->first();
            if (isset($user_email)) {
                return response(null, CODE_CONFLICT);
            }
            $user->email = $email;
        }
        if (isset($name)) $user->name = $name;
        if (isset($surname)) $user->surname = $surname;
        if (isset($phone)) $user->phone = $phone;

        if ($user->save()) {
            return response()->json($user)->setStatusCode(CODE_OK);
        }
        return response(null, CODE_SERVER_ERROR);
    }

    public function createUser() {
        $email = Input::get('email');
        $password = Input::get('password');
        $name = Input::get('name');
        $surname = Input::get('surname');
        $phone = Input::get('phone');

        $role_id = Input::get('role_id');
        if (isset($role_id)) {
            $roles = RolesController::getCompanyRoles(TokenDataHelper::getCompanyIdFromToken(), $role_id);
            if (!isset($roles)) {
                return response(null, CODE_BAD_REQUEST);
            }
        }

        if ($email == null){
            return response(null, CODE_BAD_REQUEST);
        }

        $user = User::where('email', '=', $email)->first();
        if (isset($user)) {
            return response(null, CODE_CONFLICT);
        }

        $password = 'test';

        $newUser = new User;
        $newUser->email = $email;
        $newUser->password = Hash::make($password);
        $newUser->name = $name;
        $newUser->surname = $surname;
        $newUser->phone = $phone;

        DB::beginTransaction();
        if($newUser->save()) {
            $user_company_role = new UserCompanyRole();
            $user_company_role->user_id = $newUser->id;
         //   $user_company_role->company_id = TokenDataHelper::getCompanyIdFromToken();
            $user_company_role->role_id = isset($role_id) ? $role_id : Role::ROLE_GUEST;
            if ($user_company_role->save()) {
                DB::commit();
                return response()->json($newUser)->setStatusCode(CODE_OK);
            }
        }

        DB::rollBack();
        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * @OA\Delete(
     *     path="/users/{id}",
     *     description="Deletes the user with the specified id",
     *     operationId="delete user",
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="User id",
     *          @OA\Schema(
     *              type="number",
     *              default=21
     *          ),
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="User not found",
     *     ),
     * ),
     */
    public function deleteUser($id) {
        if (isset($id)) {
            $user_check = User::find($id);
            if (!isset($user_check)) {
                return response(null, CODE_NOT_FOUND);
            }
            $user = $this->getCompanyUsers(TokenDataHelper::getCompanyIdFromToken(), $id)->first();
            if (!isset($user)) {
                //només es podrà obtenir les companyies de l'usuari, sino 403
                return response(null, CODE_FORBIDDEN);
            }

            DB::beginTransaction();
            if ($user->delete()) {
                if (UserCompanyRole::where('user_id', '=', $id)->delete()) {
                    DB::commit();
                    return response(null, CODE_OK);
                }
            }

            DB::rollBack();
            return response(null, CODE_SERVER_ERROR);
        } else {
            return response(null, CODE_BAD_REQUEST);
        }
    }

}

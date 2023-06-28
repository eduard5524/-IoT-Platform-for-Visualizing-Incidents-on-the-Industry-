<?php

namespace App\Http\Controllers\General;

use App\Http\Helpers\TokenDataHelper;
use App\Module;
use App\Role;
use App\UserCompanyRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class RolesController extends Controller
{

    /**
     * Query that returns all company roles. Just the company's, even if it's a group company
     * @param $companyId integer with user company id
     */
    public static function getCompanyRoles($companyId, $roleId = null) {
        $roles = Role::where(function ($query) use ($companyId) {
            $query->where('company_id' , '=', $companyId);
        })->with(['modules']);

        if (isset($roleId)) {
            $roles->where('id', '=', $roleId);
            return $roles->first();
        }

        return $roles->get();
    }

    /**
     * @OA\Get(
     *     path="/roles",
     *     description="Returns a list with all registered roles that meet the parameters requirements",
     *     operationId="get roles",
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *     ),
     * ),
     */
    public function getRoles()
    {
        $roles = $this->getCompanyRoles(TokenDataHelper::getCompanyIdFromToken());
        if (count($roles) == 0) {
            return response(null, CODE_NO_CONTENT);
        }
        return response()->json($roles)->setStatusCode(CODE_OK);
    }

    /**
     * @OA\Get(
     *     path="/roles/{id}",
     *     description="Returns the specified role",
     *     operationId="get role",
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="Role id",
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
     *                      default=21
     *                  ),
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="Role21"
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="Role not found",
     *     ),
     * ),
     */
    public function getRole($id) {
        if (isset($id)) {
            $role = $this->getCompanyRoles(TokenDataHelper::getCompanyIdFromToken(), $id);
            if (!isset($role)) {
                return response(null, CODE_NOT_FOUND);
            }

            return response()->json($role)->setStatusCode(CODE_OK);
        } else {
            return response(null, CODE_BAD_REQUEST);
        }
    }

    /**
     * @OA\POST(
     *     path="/roles",
     *     operationId="create role",
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="Role21"
     *                  ),
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=400,
     *          description="Wrong parameters",
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
     *                      default=21
     *                  ),
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="Role21"
     *                  ),
     *              ),
     *          ),
     *     ),
     * )
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function createRole(Request $request) {
        $name = Input::get('name');
     //   $company_id = Input::get('company_id');
        $description = Input::get('description');

        if (!isset($name)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newRole = new Role();
        $newRole->name = $name;
        $newRole->description = $description;
      //  $newRole->company_id = $company_id;

        if($newRole->save()) {
            //Modules
            $modules = $this->getModulesFromRequest($request);
            $newRole->modules()->attach($modules);
            return response()->json($newRole)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);

    }

    /**
     * @OA\Put(
     *     path="/roles",
     *     description="Edits the role with the specified id",
     *     operationId="edit role",
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
     *                      property="name",
     *                      type="string",
     *                      default="New Role21"
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
     *          description="Role not found",
     *     ),
     * ),
     * @param $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function editRole(Request $request) {
        $id = Input::get('id');
        $role = $this->getCompanyRoles(TokenDataHelper::getCompanyIdFromToken(), $id);
        if (!isset($role)) {
            return response(null, CODE_NOT_FOUND);
        }

        $name = Input::get('name');
        if (!isset($name)) {
            return response(null, CODE_BAD_REQUEST);
        }
        $role->name = $name;

        $description = Input::get('description');
        if (!isset($description)) {
            return response(null, CODE_BAD_REQUEST);
        }
        $role->description = $description;

       // $company_id = Input::get('company_id');
        if (!isset($name)) {
            return response(null, CODE_BAD_REQUEST);
        }
       // $role->company_id = $company_id;


        //Modules
        $modules = $this->getModulesFromRequest($request);

        $role->modules()->sync($modules);

        if ($role->save()) {
            return response()->json($role)->setStatusCode(CODE_OK);
        }
        return response(null, CODE_SERVER_ERROR);
    }

    private function getModulesFromRequest($request) {
        $data = $request->all();

        $modules = array();
        foreach ($data['modules'] as $tmpModule) {
            $module = Module::find($tmpModule['id']);
            if (!isset($module)) {
                return response(null, CODE_BAD_REQUEST);
            }
            if (isset($tmpModule['pivot']) && isset($tmpModule['pivot']['permission_id'])) {
                $modules[$module->id] = ['permission_id' => $tmpModule['pivot']['permission_id']];
            }
        }

        return $modules;
    }

    /**
     * @OA\Delete(
     *     path="/roles/{id}",
     *     description="Deletes the role with the specified id",
     *     operationId="delete role",
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="Role id",
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
     *          description="Role not found",
     *     ),
     * ),
     */
    public function deleteRole($id) {
        if ($id == Role::ROLE_ADMIN || $id == Role::ROLE_GUEST || $id == Role::ROLE_USER) {
            return response()->json(["msg" => "Non modifiable roles"])->setStatusCode(CODE_UNAUTHORIZED);
        }

        $role = $this->getCompanyRoles(TokenDataHelper::getCompanyIdFromToken(), $id);
        if (!isset($role)) {
            return response(null, CODE_NOT_FOUND);
        }

        DB::beginTransaction();
        // TODO: la taula access
        if ($role->delete()) {
            if (UserCompanyRole::withTrashed()->where('role_id', '=', $id)->update(['role_id' => Role::ROLE_USER])) {
                DB::commit();
                return response(null, CODE_OK);
            }
        }

        DB::rollBack();
        return response(null, CODE_SERVER_ERROR);
    }
}

<?php

namespace App\Http\Controllers\General;

use App\Company;
use App\Http\Helpers\TokenDataHelper;
use App\Role;
use App\UserCompanyRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{

    /**
     * Query that returns all user companies
     * @param $userId integer amb el id del usuari amb el que cal treballar
     * @param null $companyId companyia en concret que es vol buscar
     */
    private function getUserCompanies($userId, $companyId = null) {
        $companies = Company::where(function ($q) use ($userId) {
            $q->whereHas('user_company_roles', function ($join) use ($userId) {
                $join->where('user_id', $userId);
            });
        });

        if (isset($companyId)) {
            $companies->where('companies.id', '=', $companyId);
        }

        return $companies;
    }


    /**
     * @OA\Get(
     *     path="/companies",
     *     description="Returns a list with all the user's companies",
     *     operationId="get companies",
     *     @OA\Response(
     *          response=200,
     *          description="Request successful",
     *     ),
     * ),
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function getCompanies(Request $request) {
        $companies = $this->getUserCompanies(TokenDataHelper::getUserIdFromToken());


      /*  if (count($companies) == 0) {
            return response(null, CODE_NO_CONTENT);
        }*/

        return response()->companies($companies->get())->setStatusCode(CODE_OK);
    }

    /**
     * @OA\Get(
     *     path="/companies/{id}",
     *     description="Returns the specified company",
     *     operationId="get company",
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
     *                      property="name",
     *                      type="string",
     *                      default="Company21"
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="company21@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="123456789"
     *                  ),
     *                  @OA\Property(
     *                      property="IBAN",
     *                      type="string",
     *                      default="ES501234123412341234"
     *                  ),
     *                  @OA\Property(
     *                      property="address",
     *                      type="string",
     *                      default="Diagonal 126"
     *                  ),
     *                  @OA\Property(
     *                      property="parent_id",
     *                      type="number",
     *                      default=null
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="Company not found",
     *     ),
     * ),
     */
    public function getCompany($id) {
        if (isset($id)) {
            $company_check = Company::find($id);
            if (!isset($company_check)) {
                //si no existeix es retorna un 404
                return response(null, CODE_NOT_FOUND);
            }
            $company = $this->getUserCompanies(TokenDataHelper::getUserIdFromToken(), $id);
            if (!isset($company)) {
                //només es podrà obtenir les companyies de l'usuari, sino 403
                return response(null, CODE_FORBIDDEN);
            }

            return response()->companies($company->first())->setStatusCode(CODE_OK);
        } else {
            return response(null, CODE_BAD_REQUEST);
        }
    }

    /**
     * @OA\POST(
     *     path="/companies",
     *     operationId="create company",
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                      default="Company21"
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="company21@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="123456789"
     *                  ),
     *                  @OA\Property(
     *                      property="IBAN",
     *                      type="string",
     *                      default="ES501234123412341234"
     *                  ),
     *                  @OA\Property(
     *                      property="address",
     *                      type="string",
     *                      default="Diagonal 126"
     *                  ),
     *                  @OA\Property(
     *                      property="parent_id",
     *                      type="number",
     *                      default=null
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
     *                      default="Company21"
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="company21@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="123456789"
     *                  ),
     *                  @OA\Property(
     *                      property="IBAN",
     *                      type="string",
     *                      default="ES501234123412341234"
     *                  ),
     *                  @OA\Property(
     *                      property="address",
     *                      type="string",
     *                      default="Diagonal 126"
     *                  ),
     *                  @OA\Property(
     *                      property="parent_id",
     *                      type="number",
     *                      default=null
     *                  ),
     *              ),
     *          ),
     *     ),
     * )
     */
    public function createCompany() {
        $name = Input::get('name');
        $email = Input::get('email');
        $phone = Input::get('phone');
        $nif = Input::get('NIF');
        $address = Input::get('address');

        if (!isset($name)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newCompany = new Company();
        $newCompany->name = $name;
        $newCompany->email = $email;
        $newCompany->phone = $phone;
        $newCompany->NIF = $nif;
        $newCompany->address = $address;

        //es crea la company amb el rol d'admin per l'usuari que la crea
        DB::beginTransaction();
        if($newCompany->save()) {
            $user_company_role = new UserCompanyRole();
            $user_company_role->user_id = TokenDataHelper::getUserIdFromToken();
            $user_company_role->company_id = $newCompany->id;
            $user_company_role->role_id = Role::ROLE_ADMIN;
            if ($user_company_role->save()) {
                DB::commit();
                return response()->json($newCompany)->setStatusCode(CODE_OK);
            }

          //  return response()->json($newCompany)->setStatusCode(CODE_OK);
        }

        DB::rollBack();
        return response(null, CODE_SERVER_ERROR);

    }

    /**
     * @OA\Put(
     *     path="/companies",
     *     description="Edits the company with the specified id",
     *     operationId="edit company",
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
     *                      default="New Company21"
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="new_company21@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="987654321"
     *                  ),
     *                  @OA\Property(
     *                      property="IBAN",
     *                      type="string",
     *                      default="ES501234123412341235"
     *                  ),
     *                  @OA\Property(
     *                      property="address",
     *                      type="string",
     *                      default="Diagonal 127"
     *                  ),
     *                  @OA\Property(
     *                      property="parent_id",
     *                      type="number",
     *                      default=null
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
     *                      property="name",
     *                      type="string",
     *                      default="New Company21"
     *                  ),
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                      default="new_company21@email.com"
     *                  ),
     *                  @OA\Property(
     *                      property="phone",
     *                      type="string",
     *                      default="987654321"
     *                  ),
     *                  @OA\Property(
     *                      property="IBAN",
     *                      type="string",
     *                      default="ES501234123412341235"
     *                  ),
     *                  @OA\Property(
     *                      property="address",
     *                      type="string",
     *                      default="Diagonal 127"
     *                  ),
     *                  @OA\Property(
     *                      property="parent_id",
     *                      type="number",
     *                      default=null
     *                  ),
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response=404,
     *          description="Company not found",
     *     ),
     * ),
     */
    public function editCompany() {
        $id = Input::get('id');
        if (!isset($id)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $company = Company::find($id);
        if (!isset($company)) {
            //si no existeix es retorna un 404
            return response(null, CODE_NOT_FOUND);
        }
        $company_check = $this->getUserCompanies(TokenDataHelper::getUserIdFromToken(), $id)->first();
        if (!isset($company_check)) {
            //només es podrà obtenir les companyies de l'usuari, sino 403
            return response(null, CODE_FORBIDDEN);
        }

        $name = Input::get('name');
        $email = Input::get('email');
        $phone = Input::get('phone');
        $nif = Input::get('NIF');
        $address = Input::get('address');

        if (isset($name)) $company->name = $name;
        if (isset($email)) $company->email = $email;
        if (isset($surname)) $company->surname = $surname;
        if (isset($phone)) $company->phone = $phone;
        if (isset($nif)) $company->NIF = $nif;
        if (isset($address)) $company->address = $address;

        if ($company->save()) {
            return response()->companies($company)->setStatusCode(CODE_OK);
        }
        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * @OA\Delete(
     *     path="/companies/{id}",
     *     description="Deletes the company with the specified id",
     *     operationId="delete company",
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="Company id",
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
     *          description="Company not found",
     *     ),
     * ),
     */
    public function deleteCompany($id) {
        if (isset($id)) {
            $company = Company::find($id);
            if (!isset($company)) {
                //si no existeix es retorna un 404
                return response(null, CODE_NOT_FOUND);
            }
            $company_check = $this->getUserCompanies(TokenDataHelper::getUserIdFromToken(), $id)->first();
            if (!isset($company_check)) {
                //només es podrà obtenir les companyies de l'usuari, sino 403
                return response(null, CODE_FORBIDDEN);
            }

            DB::beginTransaction();
            if ($company->delete()) {
               /* if (UserCompanyRole::where('company_id', '=', $id)->delete()) {

                    DB::commit();
                    return response(null, CODE_OK);
                }*/
                DB::commit();
                return response(null, CODE_OK);
            }

            DB::rollBack();
            return response(null, CODE_SERVER_ERROR);
        } else {
            return response(null, CODE_BAD_REQUEST);
        }
    }

    /**
     * Checks if parent id exists in the database
     * @param $id company identifier
     * @return bool true if the company exists, false otherwise
     */
    private function checkParentId($id) {
        $company = Company::find($id);
        if (!isset($company)) {
            return false;
        } else {
            return true;
        }
    }
}

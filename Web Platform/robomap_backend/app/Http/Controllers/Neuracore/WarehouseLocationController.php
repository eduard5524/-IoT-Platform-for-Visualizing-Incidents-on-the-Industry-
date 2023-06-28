<?php

namespace App\Http\Controllers\Neuracore;

use App\WarehouseLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class WarehouseLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $warehouseLocation = WarehouseLocation::orderBy('created_at','DESC')->get();

        if(!$warehouseLocation){
            return null;
        }

        return $warehouseLocation;
    }


               /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        $warehouseLocation = WarehouseLocation::orderBy('id','DESC')->where('id', $id)->get();

        if(!$warehouseLocation){
            return null;
        }

        return $warehouseLocation;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $location = Input::all();

        if (!isset($location)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $warehouseLocation = new WarehouseLocation();

        $warehouseLocation->company_id = Input::get('company_id');
        $warehouseLocation->name = Input::get('name');
        $warehouseLocation->address = Input::get('address');
        $warehouseLocation->country = Input::get('country');
        $warehouseLocation->city = Input::get('city');
        $warehouseLocation->postal_code = Input::get('postal_code');
        $warehouseLocation->contact_name = Input::get('contact_name');
        $warehouseLocation->contact_phone = Input::get('contact_phone');
        $warehouseLocation->contact_email = Input::get('contact_email');



        if($warehouseLocation->save()) {
            return response()->json($warehouseLocation)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WarehouseLocation  $warehouseLocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WarehouseLocation $warehouseLocation)
    {
        $id = $request->get('id');

        if($warehouseLocation = WarehouseLocation::where('id', $id)->update($request->all())) {
            return response()->json($warehouseLocation)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

        /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WarehouseLocation  $warehouseLocation
     * @return \Illuminate\Http\Response
     */
    public function destroy($warehouseLocation)
    {
        if (isset($warehouseLocation)) {
            $location = WarehouseLocation::find($warehouseLocation);
            if (!isset($location)) {
                return response(null, CODE_NOT_FOUND);
            }

            if ($location->delete()) {
                return response()->json($location)->setStatusCode(CODE_OK);
            }
            return response(null, CODE_SERVER_ERROR);
        }
    }

}

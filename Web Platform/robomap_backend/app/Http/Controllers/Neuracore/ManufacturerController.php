<?php

namespace App\Http\Controllers\Neuracore;

use App\Manufacturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $manufacturers = Manufacturer::orderBy('name','ASC')->get();

        if(!$manufacturers){
            return null;
        }

        return $manufacturers;
    }

         /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        $manufacturer = Manufacturer::orderBy('id','DESC')->where('id', $id)->get();

        if(!$manufacturer){
            return null;
        }

        return $manufacturer;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $manufacturer = Input::all();

        if (!isset($manufacturer)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newManufacturer = new Manufacturer();

        $newManufacturer->name = Input::get('name');
        $newManufacturer->vat = Input::get('vat');
        $newManufacturer->country = Input::get('country');
        $newManufacturer->address = Input::get('address');
        $newManufacturer->phone = Input::get('phone');
        $newManufacturer->email = Input::get('email');

        if($newManufacturer->save()) {
            return response()->json($newManufacturer)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function show(Manufacturer $manufacturer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function edit(Manufacturer $manufacturer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Manufacturer $manufacturer)
    {
        $id = $request->get('id');

        if($manufacturer = Manufacturer::where('id', $id)->update($request->all())) {
            return response()->json($manufacturer)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Manufacturer  $manufacturer
     * @return \Illuminate\Http\Response
     */
    public function destroy($manufacturer)
    {
        if (isset($manufacturer)) {
            $man = Manufacturer::find($manufacturer);
            if (!isset($man)) {
                return response(null, CODE_NOT_FOUND);
            }

            if ($man->delete()) {
                return response()->json($man)->setStatusCode(CODE_OK);
            }
            return response(null, CODE_SERVER_ERROR);
        }
    }
}

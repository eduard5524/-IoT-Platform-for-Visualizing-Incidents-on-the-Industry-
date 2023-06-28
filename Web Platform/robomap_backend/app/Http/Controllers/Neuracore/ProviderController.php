<?php

namespace App\Http\Controllers\Neuracore;

use App\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $providers = Provider::orderBy('id','DESC')->get();

        if(!$providers){
            return null;
        }

        return $providers;
    }

           /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        $provider = Provider::orderBy('name','ASC')->where('id', $id)->get();

        if(!$provider){
            return null;
        }

        return $provider;
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
        $provider = Input::all();

        if (!isset($provider)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newProvider = new Provider();

        $newProvider->name = Input::get('name');
        $newProvider->vat = Input::get('vat');
        $newProvider->country = Input::get('country');
        $newProvider->address = Input::get('address');
        $newProvider->phone = Input::get('phone');
        $newProvider->email = Input::get('email');

        if($newProvider->save()) {
            return response()->json($newProvider)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function show(Provider $provider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function edit(Provider $provider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Provider $provider)
    {
        $id = $request->get('id');

        if($provider = Provider::where('id', $id)->update($request->all())) {
            return response()->json($provider)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Provider  $provider
     * @return \Illuminate\Http\Response
     */
    public function destroy($provider)
    {
        if (isset($provider)) {
            $prov = Provider::find($provider);
            if (!isset($prov)) {
                return response(null, CODE_NOT_FOUND);
            }

            if ($prov->delete()) {
                return response()->json($prov)->setStatusCode(CODE_OK);
            }
            return response(null, CODE_SERVER_ERROR);
        }
    }
}

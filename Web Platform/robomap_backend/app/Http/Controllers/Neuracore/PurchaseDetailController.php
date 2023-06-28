<?php

namespace App\Http\Controllers\Neuracore;

use App\PurchaseDetail;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class PurchaseDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $purchase = PurchaseDetail::orderBy('created_at','DESC')->get();

        if(!$purchase){
            return null;
        }

        return $purchase;
    }

                   /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        $purchase = PurchaseDetail::orderBy('id','DESC')->where('id', $id)->get();

        if(!$purchase){
            return null;
        }

        return $purchase;
    }

                       /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByOrder($ordernum)
    {
        $purchases = PurchaseDetail::orderBy('id','DESC')->where('order_num', $ordernum)->get();

        if(!$purchases){
            return null;
        }

        return $purchases;
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
        $purchase = Input::all();

        if (!isset($purchase)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newPurchase = new PurchaseDetail();

        $newPurchase->component = Input::get('component');
        $newPurchase->order_num = Input::get('order_num');
        $newPurchase->state = Input::get('state');
        $newPurchase->ref_component = Input::get('ref_component');
        $newPurchase->project_num = Input::get('project_num');
        $newPurchase->ref_num = Input::get('ref_num');
        $newPurchase->quantity = Input::get('quantity');
        $newPurchase->provider = Input::get('provider');

        if($newPurchase->save()) {
            return response()->json($newPurchase)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PurchaseDetail  $purchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function show(PurchaseDetail $purchaseDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PurchaseDetail  $purchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(PurchaseDetail $purchaseDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PurchaseDetail  $purchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PurchaseDetail $purchaseDetail)
    {
        $id = $request->get('id');

        if($purchaseDetail = PurchaseDetail::where('id', $id)->update($request->all())) {
            return response()->json($purchaseDetail)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PurchaseDetail  $purchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(PurchaseDetail $purchaseDetail)
    {
        //
    }
}

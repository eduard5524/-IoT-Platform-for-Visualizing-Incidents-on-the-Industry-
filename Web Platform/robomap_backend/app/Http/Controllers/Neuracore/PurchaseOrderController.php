<?php

namespace App\Http\Controllers\Neuracore;

use App\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $purchase_orders = PurchaseOrder::orderBy('created_at','DESC')->get();

        if(!$purchase_orders){
            return null;
        }

        return $purchase_orders;
    }


               /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        $purchase_order = PurchaseOrder::orderBy('id','DESC')->where('id', $id)->get();

        if(!$purchase_order){
            return null;
        }

        return $purchase_order;
    }

                           /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByOrder($ordernum)
    {
        $purchases = PurchaseOrder::orderBy('id','DESC')->where('order_num', $ordernum)->get();

        if($purchases) {
            return response()->json($purchases)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
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

        $newPurchase = new PurchaseOrder();

        $newPurchase->project_num = Input::get('project_num');
        $newPurchase->ref_number = Input::get('ref_number');
        $newPurchase->date = Input::get('date');
        $newPurchase->document = Input::get('document');
        $newPurchase->company_shipto = Input::get('company_shipto');
        $newPurchase->address_shipto = Input::get('address_shipto');
        $newPurchase->country_shipto = Input::get('country_shipto');
        $newPurchase->phone_shipto = Input::get('phone_shipto');
        $newPurchase->email_shipto = Input::get('email_shipto');
        $newPurchase->vat_shipto = Input::get('vat_shipto');
        $newPurchase->provider = Input::get('provider');
        $newPurchase->company_billto = Input::get('company_billto');
        $newPurchase->address_billto = Input::get('address_billto');
        $newPurchase->country_billto = Input::get('country_billto');
        $newPurchase->phone_billto = Input::get('phone_billto');
        $newPurchase->email_billto = Input::get('email_billto');
        $newPurchase->vat_billto = Input::get('vat_billto');
        $newPurchase->items = Input::get('items');
        $newPurchase->total_price = Input::get('total_price');
        $newPurchase->order_num = Input::get('order_num');
        $newPurchase->state = Input::get('state');

        if($newPurchase->save()) {
            return response()->json($newPurchase)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function show(PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(PurchaseOrder $purchaseOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        $id = $request->get('id');

        if($purchaseOrder = PurchaseOrder::where('id', $id)->update($request->all())) {
            return response()->json($purchaseOrder)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PurchaseOrder  $purchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(PurchaseOrder $purchaseOrder)
    {
        //
    }
}

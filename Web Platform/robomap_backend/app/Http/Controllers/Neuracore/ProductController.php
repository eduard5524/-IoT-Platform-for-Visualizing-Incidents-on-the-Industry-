<?php

namespace App\Http\Controllers\Neuracore;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('title','ASC')->get();

        if(!$products){
            return null;
        }

        return $products;
    }

               /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showById($id)
    {
        $product = Product::orderBy('id','DESC')->where('id', $id)->get();

        if(!$product){
            return null;
        }

        return $product;
    }

               /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByCategory($category)
    {
        $product = Product::orderBy('title','ASC')->where('category', $category)->get();

        if(!$product){
            return null;
        }

        return $product;
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
        $product = Input::all();

        if (!isset($product)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newProduct = new Product();

        $newProduct->title = Input::get('title');
        $newProduct->description = Input::get('description');
        $newProduct->imageLink = Input::get('imageLink');
        $newProduct->madeIn = Input::get('madeIn');
        $newProduct->quantity = '100';
        $newProduct->category = Input::get('category');
        $newProduct->iva = '21';
        $newProduct->price_sin_iva = '1';
        $newProduct->medida = '1 p/u';
        $newProduct->priority = '0';
        $newProduct->codigo_articulo = Input::get('codigo_articulo');
        $newProduct->warehouse = '-';
        $newProduct->provider = Input::get('provider');
        $newProduct->manufacturer = Input::get('manufacturer');
        $newProduct->tech_sheet = Input::get('tech_sheet');
        $newProduct->prices = Input::get('prices');

        if($newProduct->save()) {
            return response()->json($newProduct)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $id = $request->get('id');

        if($product = Product::where('id', $id)->update($request->all())) {
            return response()->json($product)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($product)
    {
        if (isset($product)) {
            $prod = Product::find($product);
            if (!isset($prod)) {
                return response(null, CODE_NOT_FOUND);
            }

            if ($prod->delete()) {
                return response()->json($prod)->setStatusCode(CODE_OK);
            }
            return response(null, CODE_SERVER_ERROR);
        }
    }
}

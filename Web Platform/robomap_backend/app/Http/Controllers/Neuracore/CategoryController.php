<?php

namespace App\Http\Controllers\Neuracore;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::orderBy('id','DESC')->get();

        if(!$categories){
            return null;
        }

        return $categories;
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
        $category = Input::all();

        if (!isset($category)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newCategory = new Category();

        $newCategory->name = Input::get('name');
        $newCategory->description = Input::get('description');
        $newCategory->image = Input::get('image');

        if($newCategory->save()) {
            return response()->json($newCategory)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $id = $request->get('id');

        if($category = Category::where('id', $id)->update($request->all())) {
            return response()->json($category)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($category)
    {
        if (isset($category)) {
            $cat = Category::find($category);
            if (!isset($cat)) {
                return response(null, CODE_NOT_FOUND);
            }

            if ($cat->delete()) {
                return response()->json($cat)->setStatusCode(CODE_OK);
            }
            return response(null, CODE_SERVER_ERROR);
        }
    }
}

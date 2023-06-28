<?php

namespace App\Http\Controllers\Neuraflow;

use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = Comment::all();

        if(!$comments){
            return null;
        }

        return $comments;
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

    public function createComment(Request $request) {
        $comment = Input::all();

        if (!isset($comment)) {
            return response(null, CODE_BAD_REQUEST);
        }

        $newComment = new Comment();

        $newComment->comment = Input::get('comment');
        $newComment->id_user = Input::get('id_user');
        $newComment->created_at = Input::get('created_at');
        $newComment->updated_at = Input::get('updated_at');
        $newComment->id_alarm = Input::get('id_alarm');

        if($newComment->save()) {
            Log::info('El usuario id: ' . $newComment->id_user . ', ha añadido un comentario nuevo para la alarma: ' . $newComment->id_alarm .'.');
            return response()->json($newComment)->setStatusCode(CODE_OK);
        }

        return response(null, CODE_SERVER_ERROR);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByAlarmId($id)
    {
        $comments = Comment::orderBy('created_at','DESC')->where('id_alarm', $id)->get();

        if(!$comments){
            return null;
        }

        return $comments;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

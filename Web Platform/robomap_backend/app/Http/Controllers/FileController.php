<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request)
    {
        //$request->file('myfile')->storeAs(public_path('img'), 'filename.jpg');
      /*  $file = file_get_contents($request->file('myfile'));
        file_put_contents("img/" . $request->file('myfile')['name']);*/
        $file = file_get_contents($_FILES['myfile']['tmp_name']);
        file_put_contents("img/" . $_FILES['myfile']['name'], $file);

    }
}
<?php

namespace App\Http\Controllers;

use App\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function getModules()
    {
        $modules = Module::all();
        return response()->json($modules)->setStatusCode(CODE_OK);
    }
}

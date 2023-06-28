<?php

namespace App\Http\Controllers\General;

use App\Application;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    public function getApplications()
    {
        $applications = Application::all();
        return response()->json($applications)->setStatusCode(CODE_OK);
    }
}

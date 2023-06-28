<?php

namespace App\Http\Middleware;

use Closure;

class permissionCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //cal comprovar si es te permisos pel que es vol fer
        return $next($request);
    }
}

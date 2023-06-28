<?php

namespace App\Providers\Responses;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\ServiceProvider;

class CompaniesResponseProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(ResponseFactory $factory)
    {
        $factory->macro('companies', function ($data) {
            if ($data instanceof Collection) {
                $response = [];
                foreach ($data as $company) {
                    array_push($response, [
                        'id' => $company->id,
                        'name' => $company->name,
                        'email' => $company->email,
                        'phone' => $company->phone,
                        'NIF' => $company->NIF,
                        'address' => $company->address
                    ]);
                }
            } else {
                $response = [
                    'id' => $data->id,
                    'name' => $data->name,
                    'email' => $data->email,
                    'phone' => $data->phone,
                    'NIF' => $data->NIF,
                    'address' => $data->address
                ];
            }

            return Response::create($response);
        });
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

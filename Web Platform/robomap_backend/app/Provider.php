<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'providers';

    protected $fillable = [
       'name',
       'vat',
       'address',
       'country',
       'phone',
       'email'
    ];
    
}

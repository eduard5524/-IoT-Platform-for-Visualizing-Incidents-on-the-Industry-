<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'manufacturers';

    protected $fillable = [
        'name',
        'vat',
        'address',
        'country',
        'phone',
        'email'
    ];
}


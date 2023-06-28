<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'countries';

    protected $fillable = [
        'code',
        'active',
        'name',
        'slug',
    ];
}

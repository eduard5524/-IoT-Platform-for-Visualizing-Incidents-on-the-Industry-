<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'families';

    protected $fillable = [
        'name',
        'description',
        'components',
        'files',
    ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'category';

    protected $fillable = [
        'name',
        'description',
        'image'
    ];
}

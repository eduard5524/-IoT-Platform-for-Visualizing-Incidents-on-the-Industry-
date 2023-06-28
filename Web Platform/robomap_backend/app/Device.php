<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $connection = 'db_neuracore';
    protected $table = 'devices';

    protected $fillable = [
        'name',
        'ip',
        'port',
        'protocol',
        'state'
    ];
}

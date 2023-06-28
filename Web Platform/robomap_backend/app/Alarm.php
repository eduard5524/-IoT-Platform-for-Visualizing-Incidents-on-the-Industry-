<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alarm extends Model
{
    protected $connection = 'db_neuracore';
    protected $table = 'alarms';

    protected $fillable = [
        'location',
        'device',
        'id_alarm',
        'state',
        'id_traduction',
        'valor',
        'severity',
        'created_at',
        'updated_at',
        'description'
    ];

}

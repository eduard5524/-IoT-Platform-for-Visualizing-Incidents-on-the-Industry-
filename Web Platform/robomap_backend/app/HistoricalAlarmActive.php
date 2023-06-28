<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HistoricalAlarmActive extends Model
{
    protected $connection = 'db_neuracore';
    protected $table = 'historical_alarm_actives';

    protected $fillable = [
        'id_alarm',
        'id_user_acknow',
        'created_at',
        'updated_at'
    ];
}

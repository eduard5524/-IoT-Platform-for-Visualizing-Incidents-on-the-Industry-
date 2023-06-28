<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    protected $fillable = [
        'id_user',
        'comment',
        'id_alarm',
        'created_at',
        'updated_at'
    ];
}

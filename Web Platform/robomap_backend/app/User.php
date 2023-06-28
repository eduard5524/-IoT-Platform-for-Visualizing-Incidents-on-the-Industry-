<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;


/**
 * @property string email
 * @property string password
 * @property string name
 * @property string surname
 * @property string phone
 * @property int id
 */
class User extends Model
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'users';

    protected $appends = ['role_id', 'role_name'];

    protected $fillable = [
        'name',
        'surname',
        'password',
        'email',
        'phone',
        'superuser_parent',
        'prefered_language',
        'user_photo',
        'prefered_skin'
    ];

    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function roles() {
        return $this->belongsToMany('App\Role', 'user_roles', 'user_id', 'role_id');
    }

    public function companies() {
        return $this->belongsToMany('App\Company', 'user_roles', 'user_id');
    }

    public function getRoleIdAttribute()
    {
        return null;//$this->roles()->first()->id;
    }

    public function getRoleNameAttribute()
    {
        return null;//$this->roles()->first()->name;
    }

}

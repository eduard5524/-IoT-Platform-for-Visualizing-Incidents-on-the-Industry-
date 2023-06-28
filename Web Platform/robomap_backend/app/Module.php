<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use SoftDeletes;

    protected $table = 'modules';

    protected $fillable = [
        'name', 'application'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function roles() {
        return $this->belongsToMany('App\Role', 'access', 'module_id', 'role_id');
    }

    public function permissions() {
        return $this->belongsToMany('App\Permission', 'access', 'module_id', 'permission_id');
    }

    public function getPermissionIdAttribute()
    {
        return $this->permissions()->first()->id;
    }
}

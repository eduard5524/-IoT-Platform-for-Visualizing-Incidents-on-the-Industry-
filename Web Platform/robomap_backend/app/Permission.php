<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use SoftDeletes;

    protected $table = 'permissions';

    protected $fillable = [
        'name',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function roles() {
        return $this->belongsToMany('App\Role', 'access', 'permission_id', 'role_id');
    }

    public function modules() {
        return $this->belongsToMany('App\Module', 'access', 'permission_id', 'module_id');
    }
}

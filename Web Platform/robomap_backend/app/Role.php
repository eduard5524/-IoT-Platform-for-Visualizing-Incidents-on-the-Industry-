<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string name
 * @property int company_id
 */
class Role extends Model
{
    use SoftDeletes;

    const ROLE_ADMIN = 1;
    const ROLE_USER = 2;
    const ROLE_GUEST = 3;

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'description'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function user_company_roles() {
        return $this->hasMany(UserCompanyRole::class, 'role_id', 'id');
    }

    public function companies() {
        return $this->belongsTo(Company::class, 'id');
    }

    public function modules() {
        return $this->belongsToMany('App\Module', 'access', 'role_id', 'module_id')->withPivot('id', 'permission_id');
    }

    public function permissions() {
        return $this->belongsToMany('App\Permission', 'access', 'role_id', 'permission_id');
    }
}

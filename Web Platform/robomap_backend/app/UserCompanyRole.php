<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property  int user_id
 * @property int company_id
 * @property int role_id
 */
class UserCompanyRole extends Model
{
    use SoftDeletes;

    protected $table = 'user_roles';

    protected $fillable = [
        'user_id',
        'role_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

   public function companies() {
        return $this->belongsTo(Company::class, 'id');
    }

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function roles() {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
}

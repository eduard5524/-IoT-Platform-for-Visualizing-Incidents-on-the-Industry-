<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string name
 * @property string email
 * @property string phone
 * @property string IBAN
 * @property string address
 * @property int id
 */
class Company extends Model
{
    use SoftDeletes;

    protected $table = 'companies';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'NIF',
        'address',
        'user_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function user_company_roles() {
        return $this->hasMany(UserCompanyRole::class, 'id');
    }

    public function roles() {
        return $this->hasMany(Role::class, 'id');
    }

    public function companies() {
        return $this->hasOne(Company::class, 'id');
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WarehouseLocation extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'warehouse_location';

    protected $fillable = [
        'name',
        'address',
        'country',
        'city',
        'postal_code',
        'contact_name',
        'contact_phone',
        'contact_email'
    ];
}

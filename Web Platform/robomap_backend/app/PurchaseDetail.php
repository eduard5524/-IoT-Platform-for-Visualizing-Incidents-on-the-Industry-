<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PurchaseDetail extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'purchase_details';

    protected $fillable = [
        'component',
        'ref_component',
        'order_num',
        'state',
        'project_num',
        'ref_num',
        'quantity',
        'provider',
        'created_at',
        'updated_at'
    ];
}


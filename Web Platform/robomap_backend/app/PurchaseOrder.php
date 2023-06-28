<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'purchase_orders';

    protected $fillable = [
        'project_num',
        'ref_number',
        'date',
        'document',
        'company_shipto',
        'address_shipto',
        'country_shipto',
        'phone_shipto',
        'email_shipto',
        'vat_shipto',
        'provider',
        'company_billto',
        'address_billto',
        'country_billto',
        'phone_billto',
        'email_billto',
        'vat_billto',
        'items',
        'total_price',
        'state',
        'order_num'
    ];
}

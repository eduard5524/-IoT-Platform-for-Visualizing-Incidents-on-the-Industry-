<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'db_neuracore';

    protected $table = 'products';

    protected $fillable = [
        'title',
        'description',
        'imageLink',
        'price',
        'madeIn',
        'quantity',
        'category',
        'iva',
        'price_sin_iva',
        'medida',
        'priority',
        'codigo_articulo',
        'warehouse',
        'provider',
        'manufacturer',
        'tech_sheet',
        'price_this_prod',
        'prices'
    ];
}

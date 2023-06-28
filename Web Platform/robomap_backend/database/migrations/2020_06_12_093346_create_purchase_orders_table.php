<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchaseOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::connection('db_neuracore')->create('purchase_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('project_num');
            $table->string('order_num');
            $table->string('state');
            $table->string('document');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('db_neuracore')->dropIfExists('purchase_orders');
    }
}

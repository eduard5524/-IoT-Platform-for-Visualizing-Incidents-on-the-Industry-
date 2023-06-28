<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use \Carbon\Carbon;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modules')->insert([
            [
                'name' => "Companies",
                'icon' => "store_mall_directory",
                'created_at' => Carbon::now()
            ],
            [
                'name' => "Users",
                'icon' => "person",
                'created_at' => Carbon::now()
            ],
            [
                'name' => "Roles",
                'icon' => "category",
                'created_at' => Carbon::now()
            ]
        ]);
    }
}

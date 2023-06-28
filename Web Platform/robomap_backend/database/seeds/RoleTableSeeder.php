<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'name' => "admin",
               // 'company_id' => null,
                'created_at' => Carbon::now()
            ],
            [
                'name' => "user",
             //   'company_id' => null,
                'created_at' => Carbon::now()
            ],
            [
                'name' => "guest",
           //     'company_id' => null,
                'created_at' => Carbon::now()
            ]
        ]);
    }
}

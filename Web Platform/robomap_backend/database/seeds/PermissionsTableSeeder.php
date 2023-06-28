<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use \Carbon\Carbon;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            [
                'name' => "Read",
                'created_at' => Carbon::now()
            ],
            [
                'name' => "Write",
                'created_at' => Carbon::now()
            ],
            [
                'name' => "Admin",
                'created_at' => Carbon::now()
            ]
        ]);
    }
}

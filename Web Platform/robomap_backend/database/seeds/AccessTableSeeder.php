<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AccessTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('access')->insert([
            [
                'role_id' => 1,
                'module_id' => 1,
                'permission_id' => 3,
                'created_at' => Carbon::now()
            ],
            [
                'role_id' => 1,
                'module_id' => 2,
                'permission_id' => 3,
                'created_at' => Carbon::now()
            ],
            [
                'role_id' => 1,
                'module_id' => 3,
                'permission_id' => 3,
                'created_at' => Carbon::now()
            ],

            [
                'role_id' => 2,
                'module_id' => 1,
                'permission_id' => 2,
                'created_at' => Carbon::now()
            ],
            [
                'role_id' => 2,
                'module_id' => 2,
                'permission_id' => 2,
                'created_at' => Carbon::now()
            ],
            [
                'role_id' => 2,
                'module_id' => 3,
                'permission_id' => 2,
                'created_at' => Carbon::now()
            ],

            [
                'role_id' => 3,
                'module_id' => 1,
                'permission_id' => 1,
                'created_at' => Carbon::now()
            ],
            [
                'role_id' => 3,
                'module_id' => 2,
                'permission_id' => 1,
                'created_at' => Carbon::now()
            ]
        ]);
    }
}

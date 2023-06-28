<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call([
             ModulesTableSeeder::class,
             PermissionsTableSeeder::class,
             RoleTableSeeder::class,
             AccessTableSeeder::class,
             UsersTableSeeder::class
         ]);
    }
}

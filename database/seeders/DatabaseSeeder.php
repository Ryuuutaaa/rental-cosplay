<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Jalankan RoleSeeder terlebih dahulu agar role tersedia
        $this->call(RoleSeeder::class);

        // Jalankan UserSeeder untuk menambahkan pengguna dengan role
        $this->call(UserSeeder::class);
    }
}

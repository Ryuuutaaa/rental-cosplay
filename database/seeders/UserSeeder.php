<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::where('name', 'admin')->first();
        $cosrentRole = Role::where('name', 'cosrent')->first();
        $userRole = Role::where('name', 'user')->first();

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'name' => 'Cosrent User',
            'email' => 'cosrent@example.com',
            'password' => Hash::make('password'),
            'role_id' => $cosrentRole->id,
        ]);

        User::create([
            'name' => 'Cosrent User2',
            'email' => 'cosrent2@example.com',
            'password' => Hash::make('password'),
            'role_id' => $cosrentRole->id,
        ]);

        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ]);

        User::create([
            'name' => 'Regular User2',
            'email' => 'user2@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ]);

        User::create([
            'name' => 'Regular User3',
            'email' => 'user3@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ]);
    }
}

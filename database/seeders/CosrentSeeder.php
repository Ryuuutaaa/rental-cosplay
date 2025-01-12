<?php

namespace Database\Seeders;

use App\Models\Cosrent;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CosrentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cosrent::create([
            'cosrent_name' => 'Cosrent 1',
            'telp_number' => '08123456789',
            'address' => 'Jl. Contoh, No. 123',
            'user_id' => 2,
        ]);
        
        Cosrent::create([
            'cosrent_name' => 'Cosrent 2',
            'telp_number' => '08123456787',
            'address' => 'Jl. Example, No. 125',
            'user_id' => 3,
        ]);
    }
}

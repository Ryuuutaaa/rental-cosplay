<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\Costum;
use Illuminate\Console\Scheduling\Schedule;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('update:costum-status', function () {
    $threeDaysAgo = Carbon::now()->subDays(3);

    $costums = Costum::where('status', 'rented')
        ->where('tanggal_kembali_kostum', '<=', $threeDaysAgo)
        ->get();

    foreach ($costums as $costum) {
        $costum->update(['status' => 'ready']);
    }

    $this->info('Status kostum yang sudah 3 hari di-update ke ready.');
})->describe('Update status kostum ke ready setelah 3 hari dari waktu rental selesai');

app(Schedule::class)->command('update:costum-status')->daily();

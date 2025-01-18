<?php

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Costum;
use App\Enums\OrderStatus;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

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

Artisan::command('update:order-status', function () {
    $threeDaysAgo = Carbon::now()->subDays(3);

    $orders = Order::where('status', OrderStatus::CONFIRMED->value)
        ->where('tanggal_kembali_kostum', '<=', $threeDaysAgo)
        ->get();

    foreach ($orders as $order) {
        $order->update(['status' => OrderStatus::DONE->value]);
    }

    $this->info('Status order yang sudah 3 hari di-update ke done.');
})->describe('Update status order ke done setelah 3 hari dari waktu rental selesai');

Schedule::command('update:costum-status')->daily();

Schedule::call(function () {
    $expiredOrders = Order::where('status', OrderStatus::AWAITING_PAYMENT->value)
        ->where('deadline_payment', '<=', now())
        ->get();

    foreach ($expiredOrders as $order) {
        $order->update(['status' => OrderStatus::CANCELLED->value]);
    }
})->everyMinute();

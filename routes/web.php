<?php

use App\Http\Controllers\CategoriController;
use App\Http\Controllers\CosrentController;
use App\Http\Controllers\CostumController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderListController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route Dashboard berdasarkan Role
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $userRole = auth()->user()->role->name;

        if ($userRole === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif ($userRole === 'cosrent') {
            return redirect()->route('cosrent.dashboard');
        } elseif ($userRole === 'user') {
            return redirect()->route('user.dashboard');
        }

        abort(403);
    })->name('dashboard');



    // Routes admin
    Route::prefix('admin')->group(function () {

        // dashboard
        Route::get('/dashboard', [DashboardController::class, 'indexAdmin'])->name('admin.dashboard');

        // categori
        Route::get('/categori', [CategoriController::class, 'index'])->name('admin.categori');

        // cosrent
        Route::get("/cosrent", [CosrentController::class, 'index'])->name("admin.cosrent");

        // user
        Route::get("/user", [UserController::class, 'index'])->name("admin.user");
    });

    // Routes cosrent
    Route::prefix('cosrent')->group(function () {

        // dashboard
        Route::get('/dashboard', [DashboardController::class, 'indexCosrent'])->name('cosrent.dashboard');

        // costum
        Route::get("/costum", [CostumController::class, 'index'])->name("cosrent.costum");

        // order
        Route::get("/order", [OrderListController::class, 'index'])->name("cosrent.order");
    });


    // Routes user
    Route::prefix('user')->group(function () {

        // dahboard
        Route::get('/dashboard', [DashboardController::class, 'indexUser'])->name('user.dashboard');

        // history
        Route::get("/history", [HistoryController::class, 'index'])->name("user.history");
    });

    // Routes Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

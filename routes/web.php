<?php

use App\Http\Controllers\CategoryController;
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
        Route::get("/category", [CategoryController::class, 'index'])->name('admin.category');
        Route::get("/category/create", [CategoryController::class, 'create'])->name("admin.category.create");
        Route::post("/category", [CategoryController::class, "store"])->name("admin.category.store");
        Route::get("/category/{id}/edit", [CategoryController::class, "edit"])->name("admin.category.edit");
        Route::put("/category/{id}", [CategoryController::class, "update"])->name("admin.category.update");
        Route::delete("/category/{id}", [CategoryController::class, "destroy"])->name("admin.category.destroy");

        // cosrent
        Route::get("/cosrent", [CosrentController::class, 'index'])->name("admin.cosrent");
        Route::get("/cosrent/create", [CosrentController::class, 'create'])->name("admin.cosrent.create");
        Route::post("/cosrent", [CosrentController::class, "store"])->name("admin.cosrent.store");
        Route::get("/cosrent/{id}/edit", [CosrentController::class, "edit"])->name("admin.cosrent.edit");
        Route::put("/cosrent/{id}", [CosrentController::class, "update"])->name("admin.cosrent.update");
        Route::delete("/cosrent/{id}", [CosrentController::class, "destroy"])->name("admin.cosrent.destroy");


        // user
        Route::get("/user", [UserController::class, 'index'])->name("admin.user");
        Route::get("/user/create", [UserController::class, 'create'])->name("admin.user.create");
        Route::post("/user", [UserController::class, "store"])->name("admin.user.store");
        Route::get("/user/{id}/edit", [UserController::class, "edit"])->name("admin.user.edit");
        Route::put("/user/{id}", [UserController::class, "update"])->name("admin.user.update");
        Route::delete("/user/{id}", [UserController::class, "destroy"])->name("admin.user.destroy");

        //tambahan user yang request menjadi cosrent
        Route::get("/user/getrequest", [UserController::class, "getrequest"])->name("admin.cosrent.getrequest");
        Route::post("/user/{id}/approve", [UserController::class, "approve"])->name("admin.user.approve");
        Route::post("/user/{id}/reject", [UserController::class, "reject"])->name("admin.user.reject");
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

    //tambahan user yang request menjadi cosrent
    Route::post("/user/request", [UserController::class, "request"])->name("user.request");
});

require __DIR__ . '/auth.php';

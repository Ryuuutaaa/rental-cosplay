<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CostumController;
use App\Http\Controllers\BiodataController;
use App\Http\Controllers\CosrentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderListController;
use App\Http\Controllers\LandingPageController;

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
        //search cosrent
        Route::get('/admin/cosrent/search', [CosrentController::class, 'search'])
            ->name('admin.cosrent.search');


        // user
        Route::get("/user", [UserController::class, 'index'])->name("admin.user");
        Route::get("/user/banned", [UserController::class, "bannedlist"])->name('admin.user.bannedlist');
        Route::get('/user/{id}/detail', [UserController::class, 'detail'])->name('admin.user.detail');
        Route::put('/user/{id}/ban', [UserController::class, 'ban'])->name('admin.user.banned');
        Route::put('/user/{id}/unban', [UserController::class, 'unban'])->name('admin.user.unban');
        //tambahan route user yang request menjadi cosrent
        Route::get("/user/getrequest", [UserController::class, "getrequest"])->name("admin.cosrent.getrequest");
        Route::post("/user/{id}/approve", [UserController::class, "approve"])->name("admin.user.approve");
        Route::post("/user/{id}/reject", [UserController::class, "reject"])->name("admin.user.reject");
        //search user & banned search
        Route::get('/users/search', [UserController::class, 'search'])
            ->name('admin.users.search');
        Route::get('/users/banned/search', [UserController::class, 'searchbanned'])
            ->name('admin.users.search.banned');
    });

    // Routes cosrent
    Route::prefix('cosrent')->group(function () {

        // dashboard
        Route::get('/dashboard', [DashboardController::class, 'indexCosrent'])->name('cosrent.dashboard');

        // costum
        Route::get("/costum", [CostumController::class, 'index'])->name("cosrent.costum");
        Route::get("/costum/create", [CostumController::class, 'create'])->name("cosrent.costum.create");
        Route::post("/costum", [CostumController::class, "store"])->name("cosrent.costum.store");
        Route::get("/costum/{id}", [CostumController::class, "show"])->name("cosrent.costum.show");
        Route::get("/costum/{id}/edit", [CostumController::class, "edit"])->name("cosrent.costum.edit");
        Route::put("/costum/{id}", [CostumController::class, "update"])->name("cosrent.costum.update");
        Route::delete("/costum/{id}", [CostumController::class, "destroy"])->name("cosrent.costum.destroy");
        //search costum
        Route::get('/cosrent/costum/search', [CostumController::class, 'search'])
            ->name('cosrent.costum.search');
        //api delete image costum
        Route::delete('/cosrent/costum/delete-image/{id}', [CostumController::class, 'deleteImage'])->name('cosrent.costum.delete-image');

        // order
        Route::get("/order", [OrderListController::class, 'index'])->name("cosrent.order");

        //biodata
        Route::get("/biodata", [BiodataController::class, 'indexCosrent'])->name("cosrent.biodata");
    });

    // Routes user
    Route::prefix('user')->group(function () {

        // dahboard
        Route::get('/dashboard', [DashboardController::class, 'indexUser'])->name('user.dashboard');
        Route::get('/detail-costume/{id}', [LandingPageController::class, 'detailCostumeUser'])->name('user.detailCostume');

        // history
        Route::get("/history", [HistoryController::class, 'index'])->name("user.history");

        //biodata
        Route::get("/biodata", [BiodataController::class, 'index'])->name("user.biodata");
    });

    //rental(user & cosrent)
    Route::post("/rental", [RentController::class, "store"])->name("rental.store");
    // Route::get("/rental/{id}", [RentController::class, "show"])->name("rental.show");

    //biodata universal
    Route::post("/biodata", [BiodataController::class, "store"])->name("biodata.store");
    Route::put("/biodata/{id}", [BiodataController::class, "update"])->name("biodata.update");

    // Routes Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //cosrent profile
    Route::post('/profile/cosrent', [ProfileController::class, 'cosrent'])->name('profile.cosrent.update');

    //tambahan user yang request menjadi cosrent
    Route::post("/user/request", [UserController::class, "request"])->name("user.request");
});

require __DIR__ . '/auth.php';

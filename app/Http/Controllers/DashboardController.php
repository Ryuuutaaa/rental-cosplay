<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Cosrent;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    // Admin Dashboard
    public function indexAdmin()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }

        $categories = Category::all()->count();
        $cosrents = Cosrent::all()->count();
        $penyewa = User::where('role_id', "=", "3")->count();

        return Inertia::render('Admin/Dashboard', [
            'username' => auth()->user()->name,
            'categories' => $categories,
            'cosrents' => $cosrents,
            'penyewa' => $penyewa,
        ]);
    }

    // Cosrent Dashboard
    public function indexCosrent()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'cosrent') {
            abort(403, 'Unauthorized access');
        }

        return Inertia::render('Cosrent/Dashboard', [
            'username' => auth()->user()->name,
        ]);
    }

    // User Dashboard
    public function indexUser()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        return Inertia::render('User/Dashboard', [
            'username' => auth()->user()->name,
        ]);
    }
}

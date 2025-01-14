<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Cosrent;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Costum;
use Illuminate\Support\Facades\Storage;

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

        $costume = Costum::with(['category', 'images_of_costum' => function ($query) {
            $query->select('id', 'costum_id', 'images_link');
            $query->orderBy('id', 'asc');
        }])->get()
            ->map(function ($image) {
                $image->images_of_costum->map(function ($item) {
                    $item->images_link =  Storage::url('public/' . $item->images_link);
                    return $item;
                });
                return $image;
            });

        return Inertia::render('User/Dashboard', [
            'username' => auth()->user()->name,
            'datas' => $costume
        ]);
    }
}

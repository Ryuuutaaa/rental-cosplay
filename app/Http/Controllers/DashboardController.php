<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Admin Dashboard
    public function indexAdmin()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }

        return Inertia::render('Admin/Dashboard', [
            'username' => auth()->user()->name, // Mengirim nama pengguna ke frontend
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
            'username' => auth()->user()->name, // Mengirim nama pengguna ke frontend
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
            'username' => auth()->user()->name, // Pastikan data dikirim
        ]);
    }
}

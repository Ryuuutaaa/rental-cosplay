<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }

        return Inertia::render('Admin/Category/App');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }
        return Inertia::render("Admin/Category/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

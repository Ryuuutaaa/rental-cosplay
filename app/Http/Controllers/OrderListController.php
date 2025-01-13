<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderListController extends Controller
{
    public function checkcosrent()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'cosrent') {
            abort(403, 'Unauthorized access');
        }
    }
    public function __construct()
    {
        $this->checkcosrent();
    }

    public function search(Request $request)
    {
        $orders = Order::search(
            keyword: $request->search,
            columns: [
                //
            ],
        )->get();

        return response()->json($orders, 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Cosrent/Orders/App");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

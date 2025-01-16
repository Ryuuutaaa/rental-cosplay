<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

use function Laravel\Prompts\select;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $order = Order::where('order.user_id', auth()->user()->id)
            ->join('costum', 'costum.id', '=', 'order.costum_id')
            ->join('cosrent', 'cosrent.id', '=', 'costum.cosrent_id')
            ->select('costum.name as costume_name', 'cosrent.cosrent_name as cosrent_name', 'order.status', 'order.id')
            ->orderBy('order.created_at', 'desc')
            ->get();

        return Inertia::render("User/History/App", [
            "datas" => $order
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $order = Order::where('user_id', auth()->user()->id)->findOrFail($id)
            ->with('costum', 'costum.cosrent', 'costum.images_of_costum', 'costum.category')
            ->first();

        return Inertia::render("User/History/Detail", [
            "datas" => $order
        ]);
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

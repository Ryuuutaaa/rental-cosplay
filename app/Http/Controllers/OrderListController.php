<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Cosrent;
use Illuminate\Http\Request;

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
        $user = auth()->user();
        $cosrent = Cosrent::where('user_id', $user->id)->first();
        $order = Order::where('order.cosrent_id', $cosrent->id)
            ->join('costum', 'costum.id', '=', 'order.costum_id')
            ->join('cosrent', 'cosrent.id', '=', 'costum.cosrent_id')
            ->select('costum.name as costume_name', 'cosrent.cosrent_name as cosrent_name', 'order.status', 'order.id')
            ->orderBy('order.created_at', 'desc')
            ->get();
        return Inertia::render("Cosrent/Orders/App", [
            "datas" => $order
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id)
            ->with('costum', 'costum.cosrent', 'costum.images_of_costum', 'costum.category', 'user', 'user.biodata')
            ->first();

        return Inertia::render("Cosrent/Orders/DetailOrder", [
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

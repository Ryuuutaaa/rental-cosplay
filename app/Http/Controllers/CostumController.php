<?php

namespace App\Http\Controllers;

use App\Enums\CostumeSize;
use Inertia\Inertia;
use App\Models\Cosrent;
use App\Models\Category;
use App\Models\Costum;
use Illuminate\Http\Request;

class CostumController extends Controller
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

    public function getCosrentAccount()
    {
        $auth_user_id = auth()->user()->id;
        $user = Cosrent::where('user_id', $auth_user_id)->first();
        return $user;
    }

    public function search(Request $request)
    {
        $costumes = Costum::where('cosrent_id', $this->getCosrentAccount()->id)
            ->join('category', 'costum.category_id', '=', 'category.id')
            ->select('costum.*', 'category.name as category_name')
            ->search(
                keyword: $request->search,
                columns: ['costum.name', 'price', 'category.name', 'size', 'brand', 'status'],
            )->get();

        return response()->json($costumes, 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $costumes = Costum::where('cosrent_id', $this->getCosrentAccount()->id)
            ->join('category', 'costum.category_id', '=', 'category.id')
            ->select('costum.*', 'category.name as category_name')
            ->get();
        return Inertia::render("Cosrent/Costume/App", [
            'datas' => $costumes
        ]);
    }

    public function sizes()
    {
        $size =  [
            CostumeSize::XS->value,
            CostumeSize::S->value,
            CostumeSize::M->value,
            CostumeSize::L->value,
            CostumeSize::XL->value,
            CostumeSize::XXL->value,
            CostumeSize::OTHER->value
        ];
        return $size;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render("Cosrent/Costume/Create", [
            'categories' => $categories,
            'sizes' => $this->sizes()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cosrent = $this->getCosrentAccount();
        $request->validate([
            //
        ], [
            //
        ]);

        $costum = Costum::create([
            'cosrent_id' => $cosrent->id,
            //
        ]);

        if ($costum) {
            return redirect()->route('cosrent.order')->with('success', 'Costum created successfully!');
        }
        return redirect()->route('cosrent.order')->with('error', 'Failed to create costum');
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

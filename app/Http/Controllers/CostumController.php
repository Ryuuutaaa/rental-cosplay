<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Costum;
use App\Models\Cosrent;
use App\Models\Category;
use App\Enums\CostumeSize;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ImageOfCostum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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
            ->with('firstImage')
            ->search(
                keyword: $request->search,
                columns: ['costum.name', 'price', 'category.name', 'size', 'brand', 'status'],
            )->get()
            ->map(function ($item) {
                $item->firstImage->images_link = Storage::url('public/' . $item->firstImage->images_link);
                return $item;
            });

        return response()->json($costumes, 200);
    }

    public function allCostumeWithImages()
    {
        //ini meampilkan semua kostum dengan relasi dari category dan seluruh image_of_costume(dalam bentuk array) dari relasi juga pada model
        $costume = Costum::with(['category', 'images_of_costum' => function ($query) {
            $query->select('id', 'costum_id', 'images_link');
            $query->orderBy('id', 'asc');
        }])->get();

        return Inertia::render("Cosrent/Costume/All", [
            'datas' => $costume
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $costumes = Costum::where('cosrent_id', $this->getCosrentAccount()->id)
            ->join('category', 'costum.category_id', '=', 'category.id')
            ->select('costum.*', 'category.name as category_name')
            ->with('firstImage')
            ->get()
            ->map(function ($item) {
                $item->firstImage->images_link = Storage::url('public/' . $item->firstImage->images_link);
                return $item;
            });

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
        $cosrent = $this->getCosrentAccount();
        return Inertia::render("Cosrent/Costume/Create", [
            'categories' => $categories,
            'sizes' => $this->sizes(),
            'cosrent' => $cosrent
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "description" => "required|string",
            "price" => "required|numeric",
            "category_id" => "required|numeric|in:" . implode(",", Category::all()->pluck('id')->toArray()),
            "cosrent_id" => "required|numeric|in:" . implode(",", Cosrent::all()->pluck('id')->toArray()),
            "size" => "required|in:" . implode(",", $this->sizes()),
            "brand" => "required|string",
            'images' => 'required|array',
            "images.*" => "image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048",
        ], [
            'name.required' => 'Nama harus diisi',
            'name.string' => 'Nama harus berupa string',
            'description.required' => 'Deskripsi harus diisi',
            'description.string' => 'Deskripsi harus berupa string',
            'price.required' => 'Harga harus diisi',
            'price.numeric' => 'Harga harus berupa angka',
            'category_id.required' => 'Kategori harus dipilih',
            'category_id.numeric' => 'Kategori harus berupa angka',
            'cosrent_id.required' => 'Cosrent harus dipilih',
            'cosrent_id.numeric' => 'Cosrent harus berupa angka',
            'size.required' => 'Ukuran harus diisi',
            'size.in' => 'Ukuran harus sesuai dengan opsi',
            'brand.required' => 'Merek harus diisi',
            'brand.string' => 'Merek harus berupa string',
            'images.required' => 'Gambar harus diisi',
            'images.array' => 'Gambar harus berupa array',
            'images.*.image' => 'File harus berupa gambar',
            'images.*.mimes' => 'Format gambar harus jpg,jpeg,png,bmp,svg,gif',
            'images.*.max' => 'Ukuran gambar maksimal 2MB',
        ]);

        try {
            DB::beginTransaction();

            $insert_costum = Costum::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'category_id' => $request->category_id,
                'cosrent_id' => $request->cosrent_id,
                'size' => $request->size,
                'brand' => $request->brand,
            ]);

            if ($request->hasFile('images')) {
                $files = $request->file('images');
                foreach ($files as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $costum = Costum::latest()->first();
                    $file_name = $costum->name . '-' . date('YmdHis') . '-' . Str::random(10) . '.' . $extension;
                    $path = "uploads/costumes";

                    $file_path = $image->storeAs($path, $file_name, 'public');

                    ImageOfCostum::create([
                        'costum_id' => $costum->id,
                        'images_link' => $file_path,
                    ]);
                }
            }

            DB::commit();
            return redirect()->route('cosrent.costum.create')->with('success', 'Costum created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('cosrent.costum.create')->with('error', 'Failed to create costum: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $costume = Costum::where('id', '=', $id)
            ->with(['category', 'images_of_costum' => function ($query) {
                $query->select('id', 'costum_id', 'images_link');
                $query->orderBy('id', 'asc');
            }])
            ->first();

        // Tambahkan URL lengkap untuk setiap gambar
        $costume->images_of_costum->transform(function ($image) {
            $image->images_link = Storage::url('public/' . $image->images_link);
            return $image;
        });

        return Inertia::render("Cosrent/Costume/Detail", [
            'datas' => $costume
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

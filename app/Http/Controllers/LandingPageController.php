<?php

namespace App\Http\Controllers;

use App\Models\Costum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LandingPageController extends Controller
{

    public function detailCostumeUser($id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $costume = Costum::with(['category', 'images_of_costum' => function ($query) {
            $query->select('id', 'costum_id', 'images_link');
            $query->orderBy('id', 'asc');
        }])
            ->where('id', $id)
            ->get()
            ->map(function ($image) {
                $image->images_of_costum->map(function ($item) {
                    $item->images_link = Storage::url('public/' . $item->images_link);
                    return $item;
                });
                return $image;
            })
            ->first();

        if (!$costume) {
            abort(404, 'Costume not found');
        }

        return Inertia::render('User/DetailsCostume/App', [
            'costume' => $costume
        ]);
    }
}

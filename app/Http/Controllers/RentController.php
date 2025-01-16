<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Costum;
use App\Models\Biodata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RentController extends Controller
{
    public function formRent(string $id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole === 'admin|cosrent|user') {
            abort(403, 'Unauthorized access');
        }

        $costume_id = $id;
        $user_id = auth()->user()->id;
        $biodata = Biodata::where('user_id', $user_id)->first();
        if ($biodata) {
            $costume = Costum::where('id', "=", $costume_id)
                ->with(['category', 'images_of_costum' => function ($query) {
                    $query->select('id', 'costum_id', 'images_link');
                    $query->orderBy('id', 'asc');
                }])
                ->with('cosrent')
                ->first();

            $costume->images_of_costum->transform(function ($image) {
                $image->images_link = Storage::url('public/' . $image->images_link) ?? null;
                return $image;
            });

            return Inertia::render('Rent/FormFixRent', [
                'datas' => $costume
            ]);
        }
        if ($userRole === 'user') {
            return redirect()->route('user.biodata')->with('error', 'Silahkan isi biodata terlebih dahulu');
        }
        if ($userRole === 'cosrent') {
            return redirect()->route('cosrent.biodata')->with('error', 'Silahkan isi biodata terlebih dahulu');
        }
    }
}

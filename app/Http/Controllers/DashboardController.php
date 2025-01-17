<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use App\Enums\OrderStatus;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Costum;
use App\Models\Cosrent;
use App\Models\Category;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    // Admin Dashboard
    public function indexAdmin()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            return redirect('/');
            // abort(403, 'Unauthorized access');
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
            return redirect('/');

            // abort(403, 'Unauthorized access');
        }

        $cosrent = Cosrent::where('user_id', auth()->user()->id)->first();

        return Inertia::render('Cosrent/Dashboard', [
            'username' => auth()->user()->name,
            'cosrent' => $cosrent
        ]);
    }

    // User Dashboard
    public function indexUser()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            return redirect('/');
            // abort(403, 'Unauthorized access');
        }

        $costume = Costum::with(['category', 'images_of_costum' => function ($query) {
            $query->select('id', 'costum_id', 'images_link');
            $query->orderBy('id', 'asc');
        }])->with('cosrent')->get()
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

    public function exportCosrentReport(Request $request, $cosrent_id)
    {
        $pending_orders = Order::where('cosrent_id', '=', $cosrent_id)
            ->with('costum', 'costum.cosrent', 'costum.category', 'user', 'user.biodata')
            ->where('status', '=', OrderStatus::PENDING->value)
            ->get();

        $confirmed_orders = Order::where('cosrent_id', '=', $cosrent_id)
            ->with('costum', 'costum.cosrent', 'costum.category', 'user', 'user.biodata')
            ->where('status', '=', OrderStatus::CONFIRMED->value)
            ->get();

        $done_orders = Order::where('cosrent_id', '=', $cosrent_id)
            ->with('costum', 'costum.cosrent', 'costum.category', 'user', 'user.biodata')
            ->where('status', '=', OrderStatus::DONE->value)
            ->get();

        if ($pending_orders->isEmpty() && $confirmed_orders->isEmpty() && $done_orders->isEmpty()) {
            return back()->with('error', 'Belum ada orderan.');
        }

        $cosrentName = $pending_orders->first()?->costum->cosrent->cosrent_name
            ?? $confirmed_orders->first()?->costum->cosrent->cosrent_name
            ?? $done_orders->first()?->costum->cosrent->cosrent_name;

        $timestamp = Carbon::now()->format('d-m-Y_H-i-s');

        // return view('exports.cosrent-report', compact('pending_orders', 'confirmed_orders', 'done_orders', 'cosrentName'));


        $html = view('exports.cosrent-report', compact('pending_orders', 'confirmed_orders', 'done_orders', 'cosrentName'))->render();

        $mpdf = new Mpdf();
        $mpdf->WriteHTML($html);
        $filename = "{$cosrentName}-" . now()->format('d-m-Y_H-i-s') . ".pdf";

        return response($mpdf->Output($filename, 'S'), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
    }
}

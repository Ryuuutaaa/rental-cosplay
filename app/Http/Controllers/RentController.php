<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Costum;
use App\Models\Biodata;
use App\Enums\OrderStatus;
use Illuminate\Support\Str;
use App\Enums\CostumeStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
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
    public function submitRent(Request $request, string $id)
    {
        $request->validate([
            'tanggal_mulai_rental' => 'required|date|after:today',
        ]);

        $costume = Costum::findOrFail($id);
        $user = auth()->user();
        $tgl_mulai_rental = Carbon::parse($request->tanggal_mulai_rental);
        $tgl_kembali_kostum = $tgl_mulai_rental->addDays(3)->format('Y-m-d');

        $order = Order::create([
            'cosrent_id' => $costume->cosrent_id,
            'costum_id' => $costume->id,
            'user_id' => $user->id,
            'tanggal_mulai_rental' => $request->tanggal_mulai_rental,
            'tanggal_kembali_kostum' => $tgl_kembali_kostum
        ]);

        if ($order) {
            return redirect()->route('rent.payment', $order->id);
        }

        return redirect()->back()->with('error', 'Order gagal.');
    }

    public function paymentForm(string $id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole === 'admin|cosrent|user') {
            abort(403, 'Unauthorized access');
        }

        $order = Order::with('costum')->findOrFail($id);

        if ($order->status !== OrderStatus::PENDING->value) {
            abort(403, 'Pembayaran sudah dilakukan.');
        }

        return Inertia::render('Rent/PaymentForm', [
            'order' => $order,
        ]);
    }

    public function submitPayment(Request $request, string $id)
    {
        $request->validate([
            'bukti_pembayaran' => 'required|image|max:2048',
        ]);

        $order = Order::find($id);
        if ($order) {
            $path = $this->uploadFile($request->file('bukti_pembayaran'), 'uploads/bukti_bayar', auth()->user()->name);

            $order->update([
                'bukti_pembayaran' => $path,
            ]);

            if (auth()->user()->role->name === 'user') {
                return redirect()->route('user.dashboard')->with('success', 'Order berhasil. Tunggu konfirmasi dari Cosrent yang menangani.');
            }
            if (auth()->user()->role->name === 'cosrent') {
                return redirect()->route('cosrent.dashboard')->with('success', 'Order berhasil. Tunggu konfirmasi dari Cosrent yang menangani.');
            }
        }

        return redirect()->back()->with('error', 'Order gagal.');
    }

    public function confirmOrder(string $id)
    {
        dd($id);
        $order = Order::with('costum')->findOrFail($id);

        if ($order->status !== OrderStatus::PENDING->value) {
            return redirect()->back()->with('error', 'Order tidak valid.');
        }

        try {
            DB::beginTransaction();

            $order->update(['status' => OrderStatus::CONFIRMED->value]);

            $order->costum->update(['status' => CostumeStatus::Rented->value]);

            DB::commit();
            return redirect()->route('orders.index')
                ->with('success', 'Order berhasil dikonfirmasi.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Order gagal dikonfirmasi.');
        }
    }

    public function rejectOrder(string $id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => OrderStatus::REJECTED->value]);

        return redirect()->route('orders.index')
            ->with('success', 'Order berhasil ditolak.');
    }

    /**
     * Fungsi bantu untuk upload file.
     */
    private function uploadFile($file, $path, $prefix)
    {
        $filename = $prefix . '-' . now()->format('YmdHis') . '-' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        return $file->storeAs($path, $filename, 'public');
    }

    /**
     * Fungsi bantu untuk menghapus file.
     */
    private function deleteFile($path)
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}

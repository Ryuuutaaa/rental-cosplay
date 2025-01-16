<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Biodata;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class BiodataController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $userRole = $user->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }
        $biodata = Biodata::where('user_id', $user->id)->first() ?? null;
        return Inertia::render('User/Biodata', [
            'biodata' => $biodata,
        ]);
    }

    public function indexCosrent()
    {
        $user = auth()->user();
        $userRole = $user->role->name ?? null;
        if ($userRole !== 'cosrent') {
            abort(403, 'Unauthorized access');
        }
        $biodata = Biodata::where('user_id', $user->id)->first() ?? null;
        return Inertia::render('User/Biodata', [
            'biodata' => $biodata,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'phone_whatsapp' => 'required|numeric',
            'parents_phone' => 'required|numeric',
            'full_address' => 'required|string',
            'instagram' => 'required|string',
            'tiktok' => 'nullable|string',
            'friends_social_media' => 'required|string',
            'ktp' => 'required|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048',
            'selfie_with_ktp' => 'required|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048',
        ], [
            'user_id.required' => 'User ID is required',
            'phone_whatsapp.required' => 'Phone Whatsapp is required',
            'phone_whatsapp.numeric' => 'Phone Whatsapp must be numeric',
            'parents_phone.required' => 'Parents Phone is required',
            'parents_phone.numeric' => 'Parents Phone must be numeric',
            'full_address.required' => 'Full Address is required',
            'full_address.string' => 'Full Address must be string',
            'instagram.required' => 'Instagram is required',
            'instagram.string' => 'Instagram must be string',
            'tiktok.string' => 'Tiktok must be string',
            'friends_social_media.required' => 'Friends Social Media is required',
            'friends_social_media.string' => 'Friends Social Media must be string',
            'ktp.required' => 'KTP is required',
            'ktp.image' => 'KTP must be image',
            'ktp.mimes' => 'KTP must be in jpg,jpeg,png,bmp,svg,gif format',
            'ktp.max' => 'KTP must be less than 2MB',
            'selfie_with_ktp.required' => 'Selfie with KTP is required',
            'selfie_with_ktp.image' => 'Selfie with KTP must be image',
            'selfie_with_ktp.mimes' => 'Selfie with KTP must be in jpg,jpeg,png,bmp,svg,gif format',
            'selfie_with_ktp.max' => 'Selfie with KTP must be less than 2MB',
        ]);

        $user = auth()->user();
        $request_user_id = (int) $request->user_id;
        if ($request_user_id === $user->id) {
            if ($request->hasFile('ktp') && $request->hasFile('selfie_with_ktp')) {
                // Upload KTP
                $ktp = $request->file('ktp');
                $ktp_extension = $ktp->getClientOriginalExtension();
                $ktp_file_name = $user->name . '-' . date('YmdHis') . '-' . Str::random(10) . '.' . $ktp_extension;
                $ktp_path_saved = "uploads/biodata/ktp";
                //proses upload
                $ktp_path = $ktp->storeAs($ktp_path_saved, $ktp_file_name, 'public');

                // Upload Selfie with KTP
                $selfie_with_ktp = $request->file('selfie_with_ktp');
                $selfie_with_ktp_extension = $selfie_with_ktp->getClientOriginalExtension();
                $selfie_with_ktp_file_name = $user->name . '-' . date('YmdHis') . '-' . Str::random(10) . '.' . $selfie_with_ktp_extension;
                $selfie_with_ktp_path_saved = "uploads/biodata/selfie";
                //proses upload
                $selfie_with_ktp_path = $selfie_with_ktp->storeAs($selfie_with_ktp_path_saved, $selfie_with_ktp_file_name, 'public');

                $biodata = Biodata::create([
                    'user_id' => $user->id,
                    'phone_whatsapp' => $request->phone_whatsapp,
                    'parents_phone' => $request->parents_phone,
                    'full_address' => $request->full_address,
                    'instagram' => $request->instagram,
                    'tiktok' => $request->tiktok,
                    'friends_social_media' => $request->friends_social_media,
                    'ktp' => $ktp_path,
                    'selfie_with_ktp' => $selfie_with_ktp_path,
                ]);

                if ($biodata) {
                    return redirect()->back()->with('success', 'Data berhasil disimpan');
                }

                return redirect()->back()->with('error', 'Data gagal disimpan');
            }
        }
        return redirect()->back()->with('error', 'ijin akses tidak valid');
    }

    public function update(Request $request)
    {
        dd($request->all());
    }
}

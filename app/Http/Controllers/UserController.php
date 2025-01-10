<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Cosrent;
use Illuminate\Http\Request;
use App\Models\RequestCosrent;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }
        return Inertia::render("Admin/User/App");
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

    public function getrequest()
    {
        $user_request_cosrent = DB::table("request")->select('request.*', 'users.name', 'users.email', 'users.id as user_id')->join('users', 'request.user_id', '=', 'users.id')->get();
        // $user_request_cosrent = RequestCosrent::with('user:id,name,email')->get();
        $auth = auth()->user();
        return Inertia::render("Admin/Cosrent/Request", [
            "datas" => $user_request_cosrent,
            "auth" => $auth
        ]);
    }

    public function approve(Request $request, string $id)
    {
        $request->validate([
            "user_id" => "required",
            "status" => "required",
        ], [
            "user_id.required" => "User ID harus dikirim dengan benar!",
            "status.required" => "Status harus dikirim dengan benar!",
        ]);

        $user = User::find($request->user_id);
        $request_cosrent = RequestCosrent::find($id);
        $role_id = Role::where("name", "cosrent")->first()->id;

        if (!$user || !$request_cosrent) {
            return redirect()->back()->with('error', 'Data tidak ditemukan!');
        }

        try {
            DB::beginTransaction();

            if ($user->role->name === 'user') {
                $request_cosrent->update([
                    "status" => $request->status
                ]);

                if ($request->status === "approved") {
                    $update_role = $user->update([
                        "role_id" => $role_id
                    ]);

                    if ($update_role) {
                        Cosrent::create([
                            "user_id" => $user->id,
                            "cosrent_name" => $user->name,
                        ]);
                    }
                }

                DB::commit();

                return redirect()->route('admin.cosrent.getrequest')->with('success', 'Request berhasil diproses!');
            }

            DB::rollBack();
            return redirect()->route('admin.cosrent.getrequest')->with('error', 'User role tidak valid untuk permintaan ini.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.cosrent.getrequest')->with('error', 'Terjadi kesalahan Server.');
        }
    }

    public function reject(Request $request, string $id)
    {
        $request->validate([
            "status" => "required",
        ], [
            "status.required" => "Status harus dikirim dengan benar!",
        ]);

        $request_cosrent = RequestCosrent::find($id);

        if (!$request_cosrent) {
            return redirect()->back()->with('error', 'Data tidak ditemukan!');
        }

        try {
            $request_cosrent->update([
                "status" => $request->status
            ]);

            return redirect()->route('admin.cosrent.getrequest')->with('success', 'Request berhasil diproses!');
        } catch (\Exception $e) {
            return redirect()->route('admin.cosrent.getrequest')->with('error', 'Terjadi kesalahan Server.');
        }
    }

    public function request(Request $request)
    {
        $request->validate([
            "reason_to_be_cosrent" => "required",
        ], [
            "reason_to_be_cosrent.required" => "Mohon isi alasan",
        ]);

        $userId = auth()->user()->id;
        $user = User::find($userId);
        if ($user->role->name === 'user') {
            RequestCosrent::create([
                'user_id' => $userId,
                "reason_to_be_cosrent" => $request->reason_to_be_cosrent,
            ]);

            return redirect()->route('user.dashboard')->with('success', 'Request berhasil dikirim, mohon tunggu konfirmasi dari admin!');
        }
    }
}

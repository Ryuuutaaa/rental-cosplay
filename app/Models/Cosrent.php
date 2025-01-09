<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cosrent extends Model
{
    protected $table = "cosrent";

    protected $fillable = [
        "cosrent_name",
        "telp_number",
        "address",
        "user_id",
    ];

    protected $guarded = [
        "created_at",
        "updated_at"
    ];

    public function costum()
    {
        return $this->hasMany(Costum::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

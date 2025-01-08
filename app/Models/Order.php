<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "order";

    protected $fillable = [
        "cosrent_id",
        "costum_id",
        "user_id"
    ];

    protected $guarded = [
        "created_at",
        "updated_at"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cosrent()
    {
        return $this->hasMany(Cosrent::class);
    }

    public function costum()
    {
        return $this->belongsTo(Costum::class);
    }
}

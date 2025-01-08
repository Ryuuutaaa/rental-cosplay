<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Costum extends Model
{
    protected $table = "costum";

    protected $fillable = [
        "name",
        "description",
        "price",
        "category_id",
        "cosrent_id"
    ];

    protected $guarded = [
        "created_at",
        "updated_at",
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function cosrent()
    {
        return $this->belongsTo(Cosrent::class);
    }

    public function images_of_costum()
    {
        return $this->hasMany(ImageOfCostum::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}

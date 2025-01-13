<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Yogameleniawan\SearchSortEloquent\Traits\Sortable;
use Yogameleniawan\SearchSortEloquent\Traits\Searchable;

class Order extends Model
{
    use Searchable;
    use Sortable;
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestCosrent extends Model
{
    protected $table = 'request';

    protected $fillable = [
        'user_id',
        'reason_to_be_cosrent',
        'status',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

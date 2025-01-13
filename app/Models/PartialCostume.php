<?php

namespace App\Models;

use App\Enums\PartialCostumeSize;
use App\Enums\PartialCostumeStatus;
use Illuminate\Database\Eloquent\Model;

class PartialCostume extends Model
{
    protected $table = 'partial_costumes';

    protected $fillable = [
        'name',
        'description',
        'price',
        'size',
        'brand',
        'status',
        'stock',
        'costum_id'
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public function cast()
    {
        return [
            'size' => PartialCostumeSize::class,
            'status' => PartialCostumeStatus::class
        ];
    }

    public function costum()
    {
        return $this->belongsTo(Costum::class);
    }
}

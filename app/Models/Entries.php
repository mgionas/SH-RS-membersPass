<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Entries extends Model
{
    protected $fillable = [
        'member_id',
        'device_id',
        'access'
    ];

    public function member() : BelongsTo{
        return $this->belongsTo(Members::class, 'member_id', 'member_id');
    }
}

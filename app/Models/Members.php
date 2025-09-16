<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Members extends Model
{
    protected $fillable = [
        'member_id',
        'name',
        'surname',
        'email',
        'phone',
        'language',
        'template_id',
        'pass_id',
        'pass_serialNumber',
        'pass_url',
    ];

    public function passes(): HasMany
    {
        return $this->hasMany(MembersPasses::class, 'member_id', 'member_id');
    }
}

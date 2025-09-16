<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MembersPasses extends Model
{
    protected $fillable = [
        'member_id',
        'pass_type',
        'serial_number',
        'issue_date',
        'installed_date',
        'status',
        'url',
        'nfc_payload',
    ];

    public function template(): HasOne
    {
        return $this->hasOne(PassTemplates::class, 'type', 'pass_type');
    }
}

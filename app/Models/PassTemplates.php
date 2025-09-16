<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PassTemplates extends Model
{
    protected $fillable = [
        'type',
        'title',
        'platform',
        'style',
        'issued_passes_count',
        'installed_passes_count',
    ];
}

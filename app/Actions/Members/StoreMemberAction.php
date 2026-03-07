<?php

namespace App\Actions\Members;

use App\Models\Members;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class StoreMemberAction
{

    public function __construct(){}

    public function execute($data, $isAdmin): bool
    {
        // Generate Member ID
        $memberId = Str::random(30);

        // Store Member
        Members::create([
            'member_id'=>$memberId,
            'special_id'=>$data->specialId,
            'name'=>$data->name,
            'surname'=>$data->surname,
            'email'=>$data->email,
            'phone'=>$data->phone,
            'language'=>$data->language ?? 'en',
            'date_of_birth'=>$data->dateOfBirth ? Carbon::parse($data->dateOfBirth) : null,
            'social_media_link'=>$data->socialMediaLink ?? null,
            'approved' => $isAdmin ? 'approved' : 'pending',
        ]);

        return true;
    }
}

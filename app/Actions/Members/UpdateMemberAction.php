<?php

namespace App\Actions\Members;

use App\Models\Members;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UpdateMemberAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function execute($data, $id): bool
    {
        // Update Member
        Members::where('id', $id)->update([
            'name'=>$data->name,
            'surname'=>$data->surname,
            'email'=>$data->email,
            'phone'=>$data->phone,
            'language'=>$data->language ?? 'en',
            'date_of_birth' => Carbon::parse($data->dateOfBirth),
            'social_media_link'=>$data->socialMediaLink,
        ]);

        return true;
    }
}

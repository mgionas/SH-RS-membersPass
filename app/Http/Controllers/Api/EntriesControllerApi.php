<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Entries;
use Illuminate\Http\Request;
use App\Models\Members;

class EntriesControllerApi extends Controller
{
    public function checkEntry(Request $request) {
        $user = Members::firstWhere('member_id', $request->memberId);

        if ($user) {

            Entries::create([
                'member_id' => $request->memberId,
                'device_id' => $request->deviceId,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User found successfully.',
                'data' => $user
            ], 200);
        } else {

            return response()->json([
                'success' => false,
                'message' => 'User not found.',
                'data' => null
            ], 404);
        }
    }
}

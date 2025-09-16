<?php

namespace App\Actions\Admin;

use App\Lib\PassVendor;
use App\Models\MembersPasses;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UpdatePassDatabase
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected PassVendor $passVendor){}

    public function handle(string $passType){
        $passVendor = new PassVendor();
        try {
            $passes = $passVendor->getClient()->findPasses($passType);

            // Map data
            $row = collect($passes)
                ->map(function ($pass) {
                    return [
                        'pass_type' => $pass['passType'],
                        'serial_number' => $pass['serialNumber'],
                        'issue_date' => Carbon::parse($pass['issuedDate'])->toDateTime(),
                        'installed_date' => Carbon::parse($pass['installedDate'])->toDateTime(),
                        'status' => $pass['status'],
                        'url' => $pass['urls']['landing'],
                        'nfc_payload' => $pass['serialNumber']
                    ];
                })->all();

            MembersPasses::upsert(
                $row,
                ['serial_number'],
                ['pass_type', 'issue_date', 'installed_date', 'status', 'url'],
            );

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }
}

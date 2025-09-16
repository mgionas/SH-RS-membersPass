<?php

namespace App\Http\Controllers;

use App\Lib\PassVendor;
use App\Models\Members;
use App\Models\MembersPasses;
use App\Models\PassTemplates;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use function PHPUnit\Framework\isEmpty;

class OnboardingController extends Controller
{
    public function index(string $id)
    {
        $member = Members::where('member_id', $id)->select(['name', 'surname', 'language', 'member_id'])->first();
        if (!$member) return redirect()->route('404');

        $hasPasses = $member->passes()->exists();
        if($hasPasses) return Inertia::render('info', ['info' => 'Member pass already installed!']);

        return Inertia::render('onboarding/index', [
            'member' => $member
        ]);
    }

    public function installPass(string $id)
    {
        $getPass = MembersPasses::where('serial_number', $id)->first();

        // if pass not found
        if (!$getPass) return redirect()->route('404');

        // if already active
        if ($getPass->status === 'Active') return Inertia::render('error', ['error' => 'Pass already used!']);

        // if Removed
        if ($getPass->status === 'Removed') return Inertia::render('error', ['error' => 'Pass removed!']);

        // check status
        $passVendor = new PassVendor();
        try {
            $passes = $passVendor->getClient()->findPasses($getPass->pass_type);

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
            return Inertia::render('error', ['error' => 'Oops, Somwthing went wrong.']);
        }


        // return
        return Inertia::render('onboarding/install', [
            'pass' => $getPass,
        ]);
    }

    public function createAndroidPass(Request $request)
    {

        $member = Members::where('member_id', $request->member_id)->first();
        $template = PassTemplates::where('id', 1)->first();
        $passVendor = new PassVendor();

        try {
            $generatedPasses = $passVendor->getClient()->createPass(
                $template->type,
                [
                    'name' => $member->name . ' ' . $member->surname,
                    'member-id' => $member->special_id ?? $member->id,
                    'nfc-id' => $member->member_id,
                ]
            );

            $getPass = $passVendor->getClient()->getPass(
                $generatedPasses['passType'],
                $generatedPasses['serialNumber'],
            );

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }

        $storePass = $member->passes()->create([
            'pass_type' => $getPass['passType'],
            'serial_number' => $getPass['serialNumber'],
            'issue_date' => Carbon::now(),
            'url' => $generatedPasses['url'],
            'nfc_payload' => $member->member_id,
        ]);

        return redirect()->route('installPass', $getPass['serialNumber']);
    }

    public function createIosPass(Request $request)
    {
        $member = Members::where('member_id', $request->member_id)->first();
        $template = PassTemplates::where('id', 2)->first();
        $passVendor = new PassVendor();

        try {
            $generatedPasses = $passVendor->getClient()->createPass(
                $template->type,
                [
                    'name' => $member->name . ' ' . $member->surname,
                    'member-id' => $member->special_id ?? $member->id,
                    'nfc-id' => $member->member_id,
                ]
            );

            $getPass = $passVendor->getClient()->getPass(
                $generatedPasses['passType'],
                $generatedPasses['serialNumber'],
            );

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }

        $storePass = $member->passes()->create([
            'pass_type' => $getPass['passType'],
            'serial_number' => $getPass['serialNumber'],
            'issue_date' => Carbon::now(),
            'url' => $getPass['urls']['landing'],
            'nfc_payload' => $member->member_id,
        ]);

        return redirect()->route('installPass', $getPass['serialNumber']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Actions\PassNinja\PassNinjaActions;
use App\Actions\Templates\TemplateActions;
use App\Models\Members;
use App\Models\MembersPasses;
use App\Models\PassTemplates;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Actions\Admin\UpdatePassDatabase;

class OnboardingController extends Controller
{
    public function __construct(
        protected UpdatePassDatabase $updatePassDatabase,
        protected PassNinjaActions $passNinjaActions,
        protected TemplateActions $templateActions
    ){}

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

        // return
        return Inertia::render('onboarding/install', [
            'pass' => $getPass,
        ]);
    }

    public function createAndroidPass(Request $request)
    {

        $member = Members::where('member_id', $request->member_id)->first();
        $template = PassTemplates::where('id', 1)->first();

        try {
            $generatedPasses = $this->passNinjaActions->createPass(
                $template->type,
                $member->name . ' ' . $member->surname,
                $member->special_id ?? $member->id,
                Carbon::now()->addYear()->format('d M Y')
            );

            $this->templateActions->checkPasses($template->type);

            MembersPasses::where('serial_number', $generatedPasses['id'])->update([
                'member_id' => $request->member_id
            ]);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }

        return redirect()->route('onboarding.installPass', $generatedPasses['id']);
    }

    public function createIosPass(Request $request)
    {
        $member = Members::where('member_id', $request->member_id)->first();
        $template = PassTemplates::where('id', 2)->first();

        try {
            $generatedPasses = $this->passNinjaActions->createPass(
                $template->type,
                $member->name . ' ' . $member->surname,
                $member->special_id ?? $member->id,
                Carbon::now()->addYear()->format('d M Y')
            );

            $this->templateActions->checkPasses($template->type);

            MembersPasses::where('serial_number', $generatedPasses['id'])->update([
                'member_id' => $request->member_id
            ]);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }

        return redirect()->route('onboarding.installPass', $generatedPasses['id']);
    }
}

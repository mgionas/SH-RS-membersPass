<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Members\StoreMemberAction;
use App\Actions\Members\UpdateMemberAction;
use App\Actions\PassNinja\PassNinjaActions;
use App\Http\Controllers\Controller;
use App\Http\Requests\Members\StoreMemberRequest;
use App\Http\Requests\Members\UpdateMemberRequest;
use App\Mail\memberInvitationMail;
use App\Models\Members;
use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MembersController extends Controller
{
    public function __construct(
        protected PassNinjaActions $passNinjaActions
    ){}

    public function index()
    {
        return Inertia::render('admin/members/index', [
            'members' => Members::all(),
        ]);
    }

    public function view(string $id)
    {
        return Inertia::render('admin/members/view/index', [
            'member' => Members::where('member_id', $id)->with('passes.template')->first(),
        ]);
    }

    public function store(StoreMemberRequest $request, StoreMemberAction $storeMemberAction)
    {

        try {
            $storeMemberAction->execute($request, auth()->check());
        } catch (\Exception $exception) {
            return redirect()->back()->with('error', $exception->getMessage());
        }

        return redirect()->back()->with('success', 'Member added successfully');
    }


    public function update(int $id, UpdateMemberRequest $request, UpdateMemberAction $updateMemberAction)
    {
        try {
            $updateMemberAction->execute($request, $id);
        } catch (\Exception $exception) {
            return redirect()->back()->with('error', $exception->getMessage());
        }

        return redirect()->back()->with('success', 'Member updated successfully');
    }

    public function updatePass(Request $request)
    {
        $updatePass = $this->passNinjaActions->updatePass(
            $request->type,
            $request->id,
            $request->name,
            $request->memberId,
            $request->expire,
        );

        return dd($updatePass);
    }

    public function sendEmailInvitation()
    {
        Mail::to('gionas@outlook.com')->send(new memberInvitationMail());
    }

    public function sendSMSInvitation(Request $request, SmsService $smsService)
    {

        $content = sprintf(
            'Hello %s, You have been invited to join a select circle at the Rolling Stone Rooftop Bar. As one of our chosen guests, you\'re invited to apply for a digital access card - personalized and designed for your Wallet. to get pass, follow the link: %s',
            $request->name,
            config('app.url') . '/onboarding/' . $request->member_id
        );

        $action = $smsService->execute($request->phone, $content);

        if ($action['success']) {
            return redirect()->back()->with('error', 'Something went wrong');
        }

        return redirect()->back()->with('success', 'SMS sent successfully');
    }

    public function destory(int $id)
    {
        $member = Members::where('id', $id)->with('passes.template')->first();

        foreach ($member->passes as $pass) {
            // Remove Pass From PassNinja
            $this->passNinjaActions->deletePass($pass->pass_type, $pass->serial_number);
            // Update Pass Status
            $pass->update(['status' => 'Removed']);
        }

        return redirect()->route('members.index')->with('success', 'Member Removed successfully');
    }
}



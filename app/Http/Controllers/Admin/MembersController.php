<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Members\StoreMemberRequest;
use App\Lib\PassVendor;
use App\Mail\memberInvitationMail;
use App\Models\Members;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MembersController extends Controller
{
    public function index(){
        return Inertia::render('admin/members/index',[
            'members'=>Members::all(),
        ]);
    }

    public function store(StoreMemberRequest $request){
        $memberId = Str::random(30);

        Members::create([
            'name'=>$request->name,
            'member_id'=>$memberId,
            'surname'=>$request->surname,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'language'=>$request->language,
            'special_id'=>$request->specialId
        ]);

        return redirect()->back()->with('success','Member added successfully');
    }

    public function view(string $id){
        return Inertia::render('admin/members/view/index',[
            'member' => Members::where('member_id', $id)->with('passes.template')->first(),
        ]);
    }

    public function update(int $id, Request $request){
        Members::where('id', $id)->update([
            'name'=>$request->name,
            'surname'=>$request->surname,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'language'=>$request->language,
        ]);

        return redirect()->back()->with('success','Member added successfully');
    }

    public function updatePass(){
        $passVendor = new PassVendor();

        try {
            $updatePass = $passVendor->getClient()->putPass(
                'ptk_0x26e',
                '3d9a26ad4bc7d2f527',
                [
                    'name' => 'Name Surname',
                    'member-id' => '1234',
                    'nfc-id' => '1234',
                ]
            );
        } catch (\Throwable $th) {
            return dd($th);
        }

        return dd($updatePass);
    }

    public function sendEmailInvitation(){
        Mail::to('gionas@outlook.com')->send(new memberInvitationMail());
    }

    public function sendSMSInvitation(Request $request){

        $content = sprintf(
            'Hello %s, You have been invited to join a select circle at the Rolling Stone Rooftop Bar. As one of our chosen guests, you\'re invited to apply for a digital access card - personalized and designed for your Wallet. to get pass, follow the link: %s',
            $request->name,
            config('app.url') . '/onboarding/' . $request->member_id
        );

        try {

            $sendSMS = Http::asForm()->post('https://sender.ge/api/send.php', [
                'apikey' => config('services.sender.apikey'),
                'smsno' => 2,
                'destination' => $request->phone,
                'content' => $content
            ])->throw()->json();

        } catch (\Throwable $th) {
            return dd($th);
        }

        return redirect()->back()->with('success','SMS sent successfully');
    }
}



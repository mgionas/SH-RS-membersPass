<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Members\StoreMemberRequest;
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

    public function sendEmailInvitation(){
        Mail::to('gionas@outlook.com')->send(new memberInvitationMail());
    }

    public function sendSMSInvitation(Request $request){

        $content = sprintf(
            'Hello %s, You have been invited to join a select circle at the Rolling Stone Rooftop Bar. As one of our chosen guests, you\'re invited to apply for a digital access card - personalized and designed for your Wallet. to get pass, follow the link: %s',
            $request->name,
            config('app.url') . '/' . $request->member_id
        );

        $sendSMS = Http::asForm()->post('https://sender.ge/api/send.php', [
            'apikey' => 'b7d763510c4f521ab976baccedc5149d',
            'smsno' => 2,
            'destination' => '514552626',
            'content' => $content
        ])->throw()->json();

        return dd($sendSMS);
    }
}



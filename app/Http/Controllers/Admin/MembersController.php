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

    public function sendSMSInvitation(){
        $sendSMS = Http::post('https://sender.ge/api/send.php', [
            'apikey' => '',
            'smsno' => '1',
            'destination' => '514552626',
            'content' => ''
        ]);

        return dd($sendSMS);
    }
}

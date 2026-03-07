<?php

namespace App\Http\Controllers\Register;

use App\Actions\Members\StoreMemberAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Members\StoreMemberRequest;
use Inertia\Inertia;

class registerController extends Controller
{
    public function index()
    {
        return Inertia::render('register/page', [

        ]);
    }

    public function store(StoreMemberRequest $request, StoreMemberAction $createMemberAction)
    {

        try {
            $createMemberAction->execute($request, auth()->check());
        } catch (\Exception $exception) {
            return redirect()->back()->with('message', $exception->getMessage());
        }

        return redirect()->route('pending');
    }
}

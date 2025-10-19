<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Entries;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntriesController extends Controller
{
    public function index(){
        return Inertia::render('admin/entries/index', [
            'entries' => Entries::with('member')->get()
        ]);
    }
}

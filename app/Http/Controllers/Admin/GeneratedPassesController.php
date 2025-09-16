<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Lib\PassVendor;

class GeneratedPassesController extends Controller
{
    public function index()
    {
        $passVendor = new PassVendor();
        $generatedPasses = $passVendor->getClient()->findPasses('ptk_0x26e');

        return Inertia::render('admin/generated-passes/index',[
            'generatedPasses' => $generatedPasses,
        ]);
    }
}

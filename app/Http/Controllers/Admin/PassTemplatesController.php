<?php

namespace App\Http\Controllers\Admin;

use App\Actions\PassNinja\PassNinjaActions;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Lib\PassVendor;
use Illuminate\Http\Request;
use App\Models\PassTemplates;
use App\Http\Controllers\Controller;

class PassTemplatesController extends Controller
{
    public function __construct(
        protected PassNinjaActions $passNinjaActions
    ){}

    public function index(){
        return Inertia::render('admin/pass-templates/index',[
            'passTemplates' => PassTemplates::all()
        ]);
    }

    public function collectTemplates()
    {
        // collect
        $collector = $this->passNinjaActions->getTemplates();

        // Map data
        $row = collect($collector['pass_templates'])->map(function ($passTemplate) {
            return [
                'type' => $passTemplate['id'],
                'title' => $passTemplate['name'],
                'platform' => $passTemplate['platform'],
                'style' => $passTemplate['style'],
                'issued_passes_count' => $passTemplate['issuedPassCount'],
                'installed_passes_count' => $passTemplate['installedPassCount'],
            ];
        })->all();

        // Update
        PassTemplates::upsert(
            $row,
            ['type'],
            ['title','platform','style','issued_passes_count','installed_passes_count','created_at','updated_at']
        );

        return redirect()->back()->with('success','Templates updated successfully');
    }

    public function viewTemplate(int $id){
        $type = PassTemplates::find($id)->type;
        $generatedPasses = $this->passNinjaActions->getPasses($type);

        return Inertia::render('admin/pass-templates/view/index',[
            'generatedPasses' => $generatedPasses['passes'],
        ]);
    }

    public function removeTemplate(Request $request){
        $this->passNinjaActions->deletePass($request->passType, $request->serialNumber);

        return redirect()->back()->with('success','Template removed successfully');
    }

}

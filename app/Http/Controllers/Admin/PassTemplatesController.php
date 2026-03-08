<?php

namespace App\Http\Controllers\Admin;

use App\Actions\PassNinja\PassNinjaActions;
use App\Actions\Templates\TemplateActions;
use App\Models\MembersPasses;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PassTemplates;
use App\Http\Controllers\Controller;

class PassTemplatesController extends Controller
{
    public function __construct(
        protected PassNinjaActions $passNinjaActions,
        protected TemplateActions $templateActions
    ){}

    public function index(){
        $this->templateActions->checkTemplates();
        return Inertia::render('admin/pass-templates/index',[
            'passTemplates' => PassTemplates::all()
        ]);
    }

    public function viewTemplate(string $id){

        $this->templateActions->checkPasses($id);
        return Inertia::render('admin/pass-templates/view/index',[
            'generatedPasses' => MembersPasses::where('pass_type', $id)->with('member')->get(),
        ]);
    }

    public function removeTemplate(Request $request){
        $this->passNinjaActions->deletePass($request->pass_type, $request->serial_number);
        return redirect()->back()->with('success','Template removed successfully');
    }

}

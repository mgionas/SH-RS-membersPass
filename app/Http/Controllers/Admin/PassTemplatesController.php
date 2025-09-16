<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Lib\PassVendor;
use Illuminate\Http\Request;
use App\Models\PassTemplates;
use App\Http\Controllers\Controller;

class PassTemplatesController extends Controller
{
    public function index(){
        return Inertia::render('admin/pass-templates/index',[
            'passTemplates' => PassTemplates::all()
        ]);
    }

    public function collectTemplates()
    {

        // Get Data
        try {
            $collector = Http::withHeaders([
                'Content-Type' => 'application/json',
                'x-account-id' => config('services.passninja.account_id'),
                'x-api-key' => config('services.passninja.api_key'),
            ])->get('https://api.passninja.com/v1/pass_templates/')->throw()->json();

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }

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
        $passVendor = new PassVendor();

        try {
            $generatedPasses = $passVendor->getClient()->findPasses($type);
        } catch (\Throwable $th) {
            $generatedPasses = null;
        }

        return Inertia::render('admin/pass-templates/view/index',[
            'generatedPasses' => $generatedPasses,
        ]);
    }

    public function removeTemplate(Request $request){
        $passVendor = new PassVendor();
        try {
            $generatedPasses = $passVendor->getClient()->deletePass(
                $request->passType,
                $request->serialNumber
            );
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }

        return redirect()->back()->with('success','Template removed successfully');
    }

}

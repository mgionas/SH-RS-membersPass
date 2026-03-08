<?php

namespace App\Actions\Templates;

use App\Actions\PassNinja\PassNinjaActions;
use App\Models\MembersPasses;
use App\Models\PassTemplates;
use Carbon\Carbon;

class TemplateActions
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected PassNinjaActions $passNinjaActions
    ){}

    public function checkTemplates(): bool
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

        return true;
    }


    public function checkPasses(string $id): bool
    {
        // collect
        $passes = $this->passNinjaActions->getPasses($id);

        // Map data
        $row = collect($passes['passes'])->map(function ($pass) {
            return [
                'pass_type' => $pass['passType'],
                'serial_number' => $pass['serialNumber'],
                'issue_date' => Carbon::parse($pass['issuedDate']) ?? null,
                'installed_date' => Carbon::parse($pass['installedDate']) ?? null,
                'status' => $pass['status'],
                'url' => $pass['urls']['landing'],
                'nfc_payload' => $pass['serialNumber']
            ];
        })->all();

        // Update
        MembersPasses::upsert(
            $row,
            ['serial_number','pass_type'],
            ['issue_date', 'installed_date', 'status', 'url']
        );

        return true;
    }
}

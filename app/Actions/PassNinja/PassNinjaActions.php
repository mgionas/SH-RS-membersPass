<?php

namespace App\Actions\PassNinja;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class PassNinjaActions
{
    private string $baseUrl = 'https://api.passninja.com/v1';

    private function http(): PendingRequest
    {
        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'x-account-id' => config('services.passninja.account_id'),
            'x-api-key'    => config('services.passninja.api_key'),
        ]);
    }

    private function url(string $path): string
    {
        return rtrim($this->baseUrl, '/') . '/' . ltrim($path, '/');
    }

    private function passPayload(string $type, string $name, string $memberId, ?string $expire = null): array
    {
        return [
            'passType' => $type,
            'pass' => array_filter([
                'name'      => $name,
                'member-id' => $memberId,
                'nfc-id'    => $memberId,
                'expire'    => $expire,
            ], fn ($v) => $v !== null),
        ];
    }

    public function getTemplates(): array
    {
        return $this->http()->get($this->url('pass_templates'))->throw()->json();
    }

    public function getTemplate(string $type): array
    {
        return $this->http()->get($this->url("pass_templates/{$type}"))->throw()->json();
    }

    public function getPasses(string $type): array
    {
        return $this->http()->get($this->url("passes/{$type}"))->throw()->json();
    }

    public function getPass(string $type, string $id): array
    {
        return $this->http()->get($this->url("passes/{$type}/{$id}"))->throw()->json();
    }

    public function createPass(string $type, string $name, string $memberId, ?string $expire = null): array
    {
        return $this->http()
            ->post($this->url("passes/{$type}"), $this->passPayload($type, $name, $memberId, $expire))
            ->throw()
            ->json();
    }

    public function patchPass(string $type, string $id, string $name, string $memberId, ?string $expire = null): array
    {
        return $this->http()
            ->patch($this->url("passes/{$type}/{$id}"), $this->passPayload($type, $name, $memberId, $expire))
            ->throw()
            ->json();
    }

    public function updatePass(string $type, string $id, string $name, string $memberId, ?string $expire = null): array
    {
        return $this->http()
            ->put($this->url("passes/{$type}/{$id}"), $this->passPayload($type, $name, $memberId, $expire))
            ->throw()
            ->json();
    }

    public function deletePass(string $type, string $id): array
    {
        return $this->http()
            ->delete($this->url("passes/{$type}/{$id}"))
            ->throw()
            ->json();
    }
}

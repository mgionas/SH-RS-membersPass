<?php

namespace App\Lib;
use PassNinja\PassNinjaClient;

class PassVendor
{
    public function __construct(
        protected string $accountId = '',
        protected string $apiKey = ''
    ) {
        $this->accountId = config('services.passninja.account_id');
        $this->apiKey    = config('services.passninja.api_key');
    }

    // This method now creates and returns the client instance
    public function getClient(): PassNinjaClient
    {
        return new PassNinjaClient($this->accountId, $this->apiKey);
    }
}

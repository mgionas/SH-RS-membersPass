<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }

    public function execute($address, $content): array
    {
        try {
            Http::asForm()->post('https://sender.ge/api/send.php', [
                'apikey' => config('services.senderge.key'),
                'smsno' => 2,
                'destination' => $address,
                'content' => $content
            ])->throw()->json();

        } catch (\Throwable $th) {
            Log::error('Error Sending SMS - ' . $th->getMessage());

            return [
                'success' => false,
                'message' => $th->getMessage()
            ];
        }

        return [
            'success' => true,
        ];
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EntriesControllerApi;
use App\Http\Middleware\ApiMiddleware;

Route::post('/webhook', function (Request $request) {
    Log::info(json_encode($request->all()));
});

Route::get('/webhookget', function (Request $request) {
    Log::info(json_encode($request->all()));
});

Route::post('/entry', [EntriesControllerApi::class, 'checkEntry'])->middleware(ApiMiddleware::class);

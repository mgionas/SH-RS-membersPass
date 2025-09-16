<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/webhook', function (Request $request) {
    Log::info(json_encode($request->all()));
});

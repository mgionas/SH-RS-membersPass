<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OnboardingController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::prefix('/onboarding')->group(function () {
    Route::get('/{id}', [OnboardingController::class, 'index'])->name('index');
    Route::post('/createAndroidPass', [OnboardingController::class, 'createAndroidPass'])->name('createAndroidPass');
    Route::post('/createIosPass', [OnboardingController::class, 'createIosPass'])->name('createIosPass');
    Route::get('/install-pass/{id}', [OnboardingController::class, 'installPass'])->name('installPass');
})->name('onboarding');

Route::get('/404', function () {
    return Inertia::render('404');
})->name('404');

Route::get('/error', function () {
    return Inertia::render('error');
})->name('error');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

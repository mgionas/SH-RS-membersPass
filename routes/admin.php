<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MembersController;
use App\Http\Controllers\Admin\PassTemplatesController;
use App\Http\Controllers\Admin\GeneratedPassesController;

Route::middleware('auth')->group(function () {
    Route::prefix('pass-templates')->name('passTemplates.')->group(function () {
        Route::get('/', [PassTemplatesController::class, 'index'])->name('index');
        Route::post('/collectTemplates', [PassTemplatesController::class, 'collectTemplates'])->name('collectTemplates');

//        Route::post('/store', [PassTemplatesController::class, 'store'])->name('store');
        Route::get('/{id}', [PassTemplatesController::class, 'viewTemplate'])->name('view');
        Route::post('/remove-template', [PassTemplatesController::class, 'removeTemplate'])->name('removeTemplate');
    });

    Route::prefix('generated-passes')->name('generatedPasses.')->group(function () {
        Route::get('/', [GeneratedPassesController::class, 'index'])->name('index');
    });

    Route::prefix('members')->name('members.')->group(function () {
        Route::get('/', [MembersController::class, 'index'])->name('index');
        Route::post('/store', [MembersController::class, 'store'])->name('store');
        Route::get('/{id}', [MembersController::class, 'view'])->name('view');
        Route::post('/update/{id}', [MembersController::class, 'update'])->name('update');
        Route::post('/update-pass', [MembersController::class, 'updatePass'])->name('updatePass');
        Route::post('/sendEmailInvitation', [MembersController::class, 'sendEmailInvitation'])->name('sendEmailInvitation');
        Route::post('/sendSMSInvitation', [MembersController::class, 'sendSMSInvitation'])->name('sendSMSInvitation');
    });
});

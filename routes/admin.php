<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MembersController;
use App\Http\Controllers\Admin\PassTemplatesController;
use App\Http\Controllers\Admin\EntriesController;

Route::middleware('auth')->group(function () {
    Route::prefix('pass-templates')->name('passTemplates.')->group(function () {
        Route::get('/', [PassTemplatesController::class, 'index'])->name('index');
        Route::get('/{id}', [PassTemplatesController::class, 'viewTemplate'])->name('view');
        Route::post('/remove-template', [PassTemplatesController::class, 'removeTemplate'])->name('removeTemplate');
    });

    Route::prefix('members')->name('members.')->group(function () {
        Route::get('/', [MembersController::class, 'index'])->name('index');
        Route::post('/store', [MembersController::class, 'store'])->name('store');
        Route::get('/{id}', [MembersController::class, 'view'])->name('view');
        Route::post('/update/{id}', [MembersController::class, 'update'])->name('update');
        Route::post('/update-pass', [MembersController::class, 'updatePass'])->name('updatePass');
        Route::post('/sendEmailInvitation', [MembersController::class, 'sendEmailInvitation'])->name('sendEmailInvitation');
        Route::post('/sendSMSInvitation', [MembersController::class, 'sendSMSInvitation'])->name('sendSMSInvitation');
        Route::delete('/{id}', [MembersController::class, 'destory'])->name('destory');

        // Approve / Reject Member
        Route::post('/approveMember/{id}', [MembersController::class, 'approveMember'])->name('approveMember');
        Route::post('/rejectMember/{id}', [MembersController::class, 'rejectMember'])->name('rejectMember');

    });

    Route::prefix('entries')->name('entries.')->group(function () {
        Route::get('/', [EntriesController::class, 'index'])->name('index');
    });
});

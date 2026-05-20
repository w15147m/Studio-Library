<?php

use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\AudioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::post('/profile', [UserProfileController::class, 'update']);
    Route::post('/profile/password', [UserProfileController::class, 'updatePassword']);

    Route::get('/admin/videos', [VideoController::class, 'index']);
    Route::post('/admin/videos', [VideoController::class, 'store']);
    Route::get('/admin/videos/{id}', [VideoController::class, 'show']);

    Route::get('/admin/audios', [AudioController::class, 'index']);
    Route::post('/admin/audios', [AudioController::class, 'store']);
    Route::get('/admin/audios/{id}', [AudioController::class, 'show']);
});

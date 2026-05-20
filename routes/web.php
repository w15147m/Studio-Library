<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\SocialAuthController;

use App\Livewire\Pages\Home\HomePage;
use App\Livewire\Pages\Profile\ProfilePage;


// Public Landing Page (Livewire Master)
Route::get('/', HomePage::class)->name('home');

// Authentication pages (public)
Route::get('/signin', function () {
    return view('pages.auth.signin', ['title' => 'Sign In']);
})->name('signin')->middleware('guest');

Route::get('/signup', function () {
    return view('pages.auth.signup', ['title' => 'Sign Up']);
})->name('signup')->middleware('guest');

// Social Authentication Routes
Route::prefix('auth')->group(function () {
    Route::get('/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
});

// Protected routes (require authentication)
Route::middleware(['auth'])->group(function () {
    // Admin Studio Master Entry Point (React SPA)
    Route::get('/admin/{path?}', function () {
        return response(view('master-react', ['title' => 'Admin Studio']))
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    })->where('path', '.*')->name('admin')->middleware('admin');
});
























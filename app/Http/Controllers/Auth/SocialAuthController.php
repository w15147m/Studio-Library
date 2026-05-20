<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google for authentication.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google authentication callback.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Update existing user with social info if not already set
                $user->update([
                    'auth_provider' => 'google',
                    'external_id' => $googleUser->getId(),
                    'external_type' => 'google_user',
                    'auth_token' => $googleUser->token,
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => null, // Social users might not have a password initially
                    'type' => 'client',
                    'auth_provider' => 'google',
                    'external_id' => $googleUser->getId(),
                    'external_type' => 'google_user',
                    'auth_token' => $googleUser->token,
                    'image' => $googleUser->getAvatar(),
                ]);
            }

            Auth::login($user);

            return redirect()->intended('/');
            
        } catch (\Exception $e) {
            \Log::error('Google Auth Error: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            return redirect()->route('signin')->with('error', 'Google authentication failed.');
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserProfileController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function show(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'email'         => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'phone'         => ['nullable', 'string', 'max:20'],
            'bio'           => ['nullable', 'string', 'max:1000'],
            'temp_image_id' => ['nullable', 'integer', 'exists:temp_images,id'],
        ]);

        // Handle image via temp image
        if (!empty($validated['temp_image_id'])) {
            $tempImage = \App\Models\TempImage::find($validated['temp_image_id']);
            if ($tempImage) {
                // Delete old image
                if ($user->image && \Illuminate\Support\Facades\Storage::disk('public')->exists($user->image)) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($user->image);
                }
                // Copy temp file to permanent location
                $dest = 'uploads/avatars/' . $tempImage->name;
                \Illuminate\Support\Facades\Storage::disk('public')->copy(
                    'uploads/temp/' . $tempImage->name,
                    $dest
                );
                $validated['image'] = $dest;
            }
        }

        unset($validated['temp_image_id']);
        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user'    => $user->fresh(),
        ]);
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Models\Audio;
use Illuminate\Http\Request;

class AudioController extends Controller
{
    /**
     * Display a listing of the audios.
     */
    public function index(): JsonResponse
    {
        $audios = Audio::all()->map(function ($audio) {
            return [
                'id' => (string) $audio->id,
                'title' => $audio->title,
                'filename' => $audio->filename,
                'url' => asset("uploads/audio/{$audio->filename}"),
            ];
        });

        return response()->json($audios);
    }

    /**
     * Store a newly uploaded audio.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'audio' => 'required|file|mimes:mp3,wav,m4a,ogg',
        ]);

        $file = $request->file('audio');
        $extension = $file->getClientOriginalExtension();
        
        // Clean title to create a slug-like part for the filename
        $cleanTitle = preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($request->input('title')));
        $fileName = 'audio_' . $cleanTitle . '_' . time() . '.' . $extension;

        // Move the file to public/uploads/audio
        $audioDir = public_path('uploads/audio');
        if (!File::exists($audioDir)) {
            File::makeDirectory($audioDir, 0755, true);
        }

        $file->move($audioDir, $fileName);

        // Create database record
        $audio = Audio::create([
            'title' => $request->input('title'),
            'filename' => $fileName,
        ]);

        $mappedAudio = [
            'id' => (string) $audio->id,
            'title' => $audio->title,
            'filename' => $audio->filename,
            'url' => asset("uploads/audio/{$audio->filename}"),
        ];

        return response()->json([
            'success' => true,
            'audio' => $mappedAudio,
        ], 201);
    }

    /**
     * Display the specified audio.
     */
    public function show(string $id): JsonResponse
    {
        $audio = Audio::findOrFail($id);

        return response()->json([
            'id' => (string) $audio->id,
            'title' => $audio->title,
            'filename' => $audio->filename,
            'url' => asset("uploads/audio/{$audio->filename}"),
        ]);
    }

    /**
     * Stream an audio using HTTP Range requests.
     */
    public function stream(string $id): BinaryFileResponse
    {
        $audio = Audio::findOrFail($id);
        $filePath = public_path("uploads/audio/{$audio->filename}");
        if (!File::exists($filePath)) {
            abort(404);
        }

        return response()->file($filePath, [
            'Accept-Ranges' => 'bytes',
            'Content-Type' => 'audio/mpeg',
        ]);
    }
}

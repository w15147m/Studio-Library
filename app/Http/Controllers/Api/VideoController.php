<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class VideoController extends Controller
{
    /**
     * Display a listing of the videos.
     */
    public function index(): JsonResponse
    {
        $videoDir = public_path('uploads/video');
        if (!File::exists($videoDir)) {
            return response()->json([]);
        }

        $files = File::files($videoDir);
        $videos = [];

        foreach ($files as $file) {
            if ($file->getExtension() === 'mp4') {
                $fileName = $file->getFilename();
                $videoId = pathinfo($fileName, PATHINFO_FILENAME);
                $masterPath = "uploads/video/hls/{$videoId}/master.m3u8";
                $isTranscoded = File::exists(public_path($masterPath));

                // Generate a clean title
                $title = str_replace('_', ' ', $videoId);
                $title = ucwords($title);

                $videos[] = [
                    'id' => $videoId,
                    'title' => $title,
                    'filename' => $fileName,
                    'url' => $isTranscoded ? asset($masterPath) : asset("uploads/video/{$fileName}"),
                    'is_transcoded' => $isTranscoded,
                ];
            }
        }

        return response()->json($videos);
    }

    /**
     * Stream a video using HTTP Range requests.
     */
    public function stream(string $id): BinaryFileResponse
    {
        $filePath = public_path("uploads/video/{$id}.mp4");
        if (!File::exists($filePath)) {
            abort(404);
        }

        return response()->file($filePath, [
            'Accept-Ranges' => 'bytes',
            'Content-Type' => 'video/mp4',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    /**
     * Display a listing of the videos.
     */
    public function index(): JsonResponse
    {
        $videos = Video::all()->map(function ($video) {
            $videoId = pathinfo($video->filename, PATHINFO_FILENAME);
            $masterPath = "uploads/video/hls/{$videoId}/master.m3u8";
            
            return [
                'id' => (string) $video->id,
                'video_id' => $videoId,
                'title' => $video->title,
                'filename' => $video->filename,
                'url' => $video->is_transcoded ? asset($masterPath) : asset("uploads/video/{$video->filename}"),
                'is_transcoded' => $video->is_transcoded,
            ];
        });

        return response()->json($videos);
    }

    /**
     * Store a newly uploaded video.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video' => 'required|file|mimes:mp4,mov,avi,wmv',
        ]);

        $file = $request->file('video');
        $extension = $file->getClientOriginalExtension();
        
        // Clean title to create a slug-like part for the filename
        $cleanTitle = preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($request->input('title')));
        $fileName = 'video_' . $cleanTitle . '_' . time() . '.' . $extension;

        // Move the file to public/uploads/video
        $videoDir = public_path('uploads/video');
        if (!File::exists($videoDir)) {
            File::makeDirectory($videoDir, 0755, true);
        }

        $file->move($videoDir, $fileName);

        // Create database record
        $video = Video::create([
            'title' => $request->input('title'),
            'filename' => $fileName,
            'is_transcoded' => false,
        ]);

        // Trigger transcoding command asynchronously in the background
        $command = 'php ' . base_path('artisan') . ' video:transcode-hls > /dev/null 2>&1 &';
        exec($command);

        $videoId = pathinfo($video->filename, PATHINFO_FILENAME);
        $mappedVideo = [
            'id' => (string) $video->id,
            'video_id' => $videoId,
            'title' => $video->title,
            'filename' => $video->filename,
            'url' => asset("uploads/video/{$video->filename}"),
            'is_transcoded' => false,
        ];

        return response()->json([
            'success' => true,
            'video' => $mappedVideo,
        ], 201);
    }

    /**
     * Display the specified video.
     */
    public function show(string $id): JsonResponse
    {
        $video = Video::findOrFail($id);
        $videoId = pathinfo($video->filename, PATHINFO_FILENAME);
        $masterPath = "uploads/video/hls/{$videoId}/master.m3u8";

        return response()->json([
            'id' => (string) $video->id,
            'video_id' => $videoId,
            'title' => $video->title,
            'filename' => $video->filename,
            'url' => $video->is_transcoded ? asset($masterPath) : asset("uploads/video/{$video->filename}"),
            'is_transcoded' => $video->is_transcoded,
        ]);
    }

    /**
     * Stream a video using HTTP Range requests.
     */
    public function stream(string $id): BinaryFileResponse
    {
        $video = Video::findOrFail($id);
        $filePath = public_path("uploads/video/{$video->filename}");
        if (!File::exists($filePath)) {
            abort(404);
        }

        return response()->file($filePath, [
            'Accept-Ranges' => 'bytes',
            'Content-Type' => 'video/mp4',
        ]);
    }
}

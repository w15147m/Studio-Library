<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videoDir = public_path('uploads/video');
        if (!File::exists($videoDir)) {
            return;
        }

        $files = File::files($videoDir);

        foreach ($files as $file) {
            if ($file->getExtension() === 'mp4') {
                $fileName = $file->getFilename();
                $videoId = pathinfo($fileName, PATHINFO_FILENAME);
                $masterPath = "uploads/video/hls/{$videoId}/master.m3u8";
                $isTranscoded = File::exists(public_path($masterPath));

                $title = str_replace('_', ' ', $videoId);
                $title = ucwords($title);

                Video::firstOrCreate(
                    ['filename' => $fileName],
                    [
                        'title' => $title,
                        'is_transcoded' => $isTranscoded,
                    ]
                );
            }
        }
    }
}

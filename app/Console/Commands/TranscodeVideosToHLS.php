<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use FFMpeg\Format\Video\X264;
use App\Models\Video;

class TranscodeVideosToHLS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'video:transcode-hls';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Transcode pending videos in database to HLS format';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $videoDir = public_path('uploads/video');
        if (!File::exists($videoDir)) {
            $this->error("Directory {$videoDir} does not exist.");
            return;
        }

        $pendingVideos = Video::where('is_transcoded', false)->get();

        if ($pendingVideos->isEmpty()) {
            $this->info("No pending videos found to transcode.");
            return;
        }

        foreach ($pendingVideos as $video) {
            $fileName = $video->filename;
            $filePath = public_path("uploads/video/{$fileName}");

            if (!File::exists($filePath)) {
                $this->error("Source file {$fileName} does not exist. Skipping.");
                continue;
            }

            $videoId = pathinfo($fileName, PATHINFO_FILENAME);
            $outputDir = "uploads/video/hls/{$videoId}";
            $masterPlaylist = "{$outputDir}/master.m3u8";

            if (File::exists(public_path($masterPlaylist))) {
                $this->info("Video {$fileName} already has HLS files. Marking as transcoded.");
                $video->update(['is_transcoded' => true]);
                continue;
            }

            $this->info("Transcoding {$fileName} to HLS...");

            // Define low, medium, and high bitrates
            $lowBitrate = (new X264('aac', 'libx264'))->setKiloBitrate(250);
            $midBitrate = (new X264('aac', 'libx264'))->setKiloBitrate(500);
            $highBitrate = (new X264('aac', 'libx264'))->setKiloBitrate(1000);

            try {
                FFMpeg::fromDisk('public_root')
                    ->open("uploads/video/{$fileName}")
                    ->exportForHLS()
                    ->addFormat($lowBitrate, function ($media) {
                        $media->scale(854, 480);
                    })
                    ->addFormat($midBitrate, function ($media) {
                        $media->scale(1280, 720);
                    })
                    ->addFormat($highBitrate, function ($media) {
                        $media->scale(1920, 1080);
                    })
                    ->toDisk('public_root')
                    ->save($masterPlaylist);

                $video->update(['is_transcoded' => true]);
                $this->info("Transcoded {$fileName} successfully!");
            } catch (\Exception $e) {
                $this->error("Failed to transcode {$fileName}: " . $e->getMessage());
            }
        }
    }
}

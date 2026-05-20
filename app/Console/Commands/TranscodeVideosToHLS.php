<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use FFMpeg\Format\Video\X264;

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
    protected $description = 'Transcode existing videos in public/uploads/video to HLS format';

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

        $files = File::files($videoDir);
        $mp4Files = array_filter($files, function ($file) {
            return $file->getExtension() === 'mp4';
        });

        if (empty($mp4Files)) {
            $this->info("No MP4 files found in {$videoDir}.");
            return;
        }

        foreach ($mp4Files as $file) {
            $fileName = $file->getFilename();
            $videoId = pathinfo($fileName, PATHINFO_FILENAME);
            $outputDir = "uploads/video/hls/{$videoId}";
            $masterPlaylist = "{$outputDir}/master.m3u8";

            if (File::exists(public_path($masterPlaylist))) {
                $this->info("Video {$fileName} already transcoded. Skipping.");
                continue;
            }

            $this->info("Transcoding {$fileName} to HLS...");

            // Define low, medium, and high bitrates
            $lowBitrate = (new X264('aac', 'libx264'))->setKiloBitrate(250);
            $midBitrate = (new X264('aac', 'libx264'))->setKiloBitrate(500);
            $highBitrate = (new X264('aac', 'libx264'))->setKiloBitrate(1000);

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

            $this->info("Transcoded {$fileName} successfully!");
        }
    }
}

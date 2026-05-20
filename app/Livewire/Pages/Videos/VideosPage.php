<?php

namespace App\Livewire\Pages\Videos;

use App\Models\Video;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;

#[Layout('master-livewire')]
#[Title('Videos — Studio Library')]
class VideosPage extends Component
{
    public function render()
    {
        $videos = Video::latest()->get()->map(function ($video) {
            $videoId = pathinfo($video->filename, PATHINFO_FILENAME);
            $masterPath = "uploads/video/hls/{$videoId}/master.m3u8";

            return [
                'id'            => $video->id,
                'title'         => $video->title,
                'url'           => $video->is_transcoded
                    ? asset($masterPath)
                    : asset("uploads/video/{$video->filename}"),
                'is_transcoded' => $video->is_transcoded,
            ];
        });

        return view('livewire.pages.Videos.VideosPage', ['videos' => $videos]);
    }
}

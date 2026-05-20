<?php

namespace App\Livewire\Pages\Audios;

use App\Models\Audio;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;

#[Layout('master-livewire')]
#[Title('Audios — Studio Library')]
class AudiosPage extends Component
{
    public function render()
    {
        $audios = Audio::latest()->get()->map(function ($audio) {
            return [
                'id'       => $audio->id,
                'title'    => $audio->title,
                'url'      => asset("uploads/audio/{$audio->filename}"),
            ];
        });

        return view('livewire.pages.Audios.AudiosPage', ['audios' => $audios]);
    }
}

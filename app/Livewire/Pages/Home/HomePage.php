<?php

namespace App\Livewire\Pages\Home;

use Livewire\Component;
use Livewire\Attributes\Layout;

#[Layout('master-livewire')]
class HomePage extends Component
{
    public function render()
    {
        return view('livewire.pages.Home.HomePage');
    }
}

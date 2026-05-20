<?php

namespace App\Livewire\Common;

use Livewire\Component;
use Livewire\Attributes\On;

class AuthModal extends Component
{
    public $isOpen = false;
    public $message = 'Please log in to manage your shopping cart.';

    #[On('show-auth-modal')]
    public function show($message = null)
    {
        if ($message) {
            $this->message = $message;
        }
        $this->isOpen = true;
    }

    public function close()
    {
        $this->isOpen = false;
    }

    public function render()
    {
        return view('livewire.common.auth-modal');
    }
}

<?php

namespace App\Livewire\Common;

use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class UserDropdown extends Component
{
    public function logout()
    {
        Auth::logout();
        session()->invalidate();
        session()->regenerateToken();

        return redirect()->route('home');
    }

    public function render()
    {
        return view('livewire.common.user-dropdown');
    }
}

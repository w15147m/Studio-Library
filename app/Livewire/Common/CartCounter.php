<?php

namespace App\Livewire\Common;

use Livewire\Component;
use App\Services\CartService;
use Livewire\Attributes\On;

class CartCounter extends Component
{
    public $count = 0;

    public function mount(\App\Services\CartService $cart)
    {
        $this->count = $cart->count();
    }

    public function handleClick()
    {
        if (!auth()->check()) {
            $this->dispatch('show-auth-modal', message: 'Sign in to access and manage your shopping cart.');
            return;
        }
        
        return $this->redirectRoute('cart.index', navigate: true);
    }

    #[On('cartUpdated')]
    public function updateCount()
    {
        $cart = new \App\Services\CartService();
        $this->count = $cart->count();
    }

    public function render()
    {
        return view('livewire.common.cart-counter');
    }
}

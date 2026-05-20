<?php

namespace App\Livewire\Common;

use Livewire\Component;
use Livewire\Attributes\On;
use App\Services\CartService;

class DuplicateItemModal extends Component
{
    public $isOpen = false;
    public $productId;
    public $productTitle;

    #[On('show-duplicate-modal')]
    public function show($productId, $productTitle)
    {
        $this->productId = $productId;
        $this->productTitle = $productTitle;
        $this->isOpen = true;
    }

    public function close()
    {
        $this->isOpen = false;
    }

    public function addAnyway(CartService $cart)
    {
        $cart->add($this->productId, 1);
        $this->dispatch('cartUpdated');
        $this->close();
    }

    public function render()
    {
        return view('livewire.common.duplicate-item-modal');
    }
}

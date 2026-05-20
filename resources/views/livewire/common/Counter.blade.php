<div class="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Livewire Counter Test</h2>
    
    <div class="flex items-center gap-4">
        <button wire:click="decrement" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
            -
        </button>
        
        <span class="text-4xl font-bold text-gray-800 dark:text-white">{{ $count }}</span>
        
        <button wire:click="increment" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            +
        </button>
    </div>
    
    <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Click the buttons to test Livewire reactivity!
    </p>
</div>

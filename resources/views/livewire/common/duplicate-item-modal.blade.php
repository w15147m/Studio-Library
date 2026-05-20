<div 
    x-data="{ show: @entangle('isOpen') }" 
    x-show="show" 
    x-cloak 
    class="fixed inset-0 z-[101] overflow-y-auto"
    aria-labelledby="modal-title" 
    role="dialog" 
    aria-modal="true"
>
    <!-- Backdrop -->
    <div 
        x-show="show"
        x-transition:enter="ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
    ></div>

    <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
            x-show="show"
            x-transition:enter="ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
            x-transition:leave="ease-in duration-200"
            x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
            x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100 dark:border-gray-700"
        >
            <div class="px-6 pt-8 pb-6 sm:p-10 sm:pb-8">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10 sm:mx-0 sm:h-12 sm:w-12">
                        <svg class="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div class="mt-4 text-center sm:mt-0 sm:ml-6 sm:text-left">
                        <h3 class="text-xl font-bold leading-6 text-gray-900 dark:text-white" id="modal-title">Item Already in Cart</h3>
                        <div class="mt-3">
                            <p class="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
                                <span class="font-bold text-gray-900 dark:text-white">{{ $productTitle }}</span> is already in your cart. Would you like to add another one?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/50 px-6 py-5 sm:flex sm:flex-row-reverse sm:px-10 gap-3">
                <button 
                    type="button" 
                    wire:click="addAnyway"
                    class="inline-flex w-full justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-600 transition-colors sm:w-auto active:scale-95"
                >
                    Add Anyway
                </button>
                <button 
                    type="button" 
                    wire:click="close"
                    class="mt-3 inline-flex w-full justify-center rounded-xl bg-white dark:bg-gray-800 px-6 py-3 text-sm font-bold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto transition-colors active:scale-95"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>

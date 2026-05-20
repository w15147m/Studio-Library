<div x-data="{ open: false }" class="relative inline-flex items-center gap-4">
    <!-- User Info Toggle -->
    <a 
        href="javascript:void(0)" 
        @click="open = !open"
        @click.outside="open = false"
        class="flex items-center gap-3 hover:opacity-80 transition-opacity"
    >
        <div class="hidden text-right lg:block">
            <span class="block text-sm font-bold text-gray-900 dark:text-white">
                {{ auth()->user()->name }}
            </span>
        </div>

        <div class="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 dark:border-gray-800 ring-2 ring-gray-50 dark:ring-gray-800/50 bg-gray-50 flex items-center justify-center">
            @if(auth()->user()->image)
                <img src="{{ filter_var(auth()->user()->image, FILTER_VALIDATE_URL) ? auth()->user()->image : asset('storage/' . auth()->user()->image) }}" 
                     alt="User Avatar" 
                     class="h-full w-full object-cover"
                     referrerpolicy="no-referrer"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                <img style="display: none;" src="{{ asset('images/user/owner.jpg') }}" alt="User Avatar Default" class="h-full w-full object-cover">
            @else
                <img src="{{ asset('images/user/owner.jpg') }}" alt="User Avatar" class="h-full w-full object-cover">
            @endif
        </div>

        <svg 
            class="hidden fill-current text-gray-400 lg:block transition-transform duration-200" 
            :class="open ? 'rotate-180' : ''"
            width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
            <path d="M10.4335 4.10352C10.2812 3.95117 10.043 3.95117 9.89063 4.10352L6 7.99414L2.10938 4.10352C1.95703 3.95117 1.71875 3.95117 1.56641 4.10352C1.41406 4.25586 1.41406 4.49414 1.56641 4.64648L5.72852 8.80859C5.80469 8.88477 5.90234 8.92285 6 8.92285C6.09766 8.92285 6.19531 8.88477 6.27148 8.80859L10.4335 4.64648C10.5858 4.49414 10.5858 4.25586 10.4335 4.10352Z" />
        </svg>
    </a>

    <!-- Dropdown Menu -->
    <div 
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-out duration-100"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="absolute right-0 top-full z-50 mt-4 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
    >
        <div class="px-4 py-3 border-b border-gray-50 dark:border-gray-800/50">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ auth()->user()->name }}</p>
            <p class="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{{ auth()->user()->email }}</p>
        </div>

        <ul class="mt-2 space-y-1">
            <li>
                <a href="/admin/profile" wire:navigate class="flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-all">
                    <svg class="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 11a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" />
                    </svg>
                    Edit Profile
                </a>
            </li>
        </ul>

        <button 
            wire:click="logout"
            class="mt-2 flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all"
        >
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z" />
            </svg>
            Sign out
        </button>
    </div>
</div>

<header class="sticky top-0 flex w-full bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
    <div class="flex items-center justify-between w-full px-4 py-4 mx-auto max-w-(--breakpoint-2xl) xl:px-8">

        <!-- Logo -->
        <a href="/" wire:navigate class="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-teal-400">
                <path d="M2.25 11.25L11.25 2.25C11.5 2 12.022 1.95 12.35 2l8 1.5c.5.1.9.5 1 1l1.5 8c.05.328 0 .85-.25 1.1l-9 9c-.2.2-.6.2-.8 0l-9.5-9.5c-.2-.2-.2-.6 0-.8z" fill="currentColor" opacity="0.8"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
            </svg>
            Starter Kit
        </a>

        <!-- Desktop Nav & Actions -->
        <div class="hidden md:flex items-center gap-10">
            <!-- Navigation Links -->
            <nav class="flex items-center gap-6 font-medium text-sm text-gray-700 dark:text-gray-300">
                <a href="/" wire:navigate class="hover:text-brand-500 transition-colors">Home</a>
                <a href="#" class="hover:text-brand-500 transition-colors">Documentation</a>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-5">
                <!-- Theme Toggle Button -->
                <button
                    class="flex items-center justify-center text-gray-700 transition-colors border border-gray-200 rounded-full h-10 w-10 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    @click="$store.theme.toggle()">
                    <!-- Sun Icon (visible in dark mode) -->
                    <svg class="hidden dark:block" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    <!-- Moon Icon (visible in light mode) -->
                    <svg class="dark:hidden" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                </button>


                                <!-- User Dropdown / Login -->
                                @auth
                                    <livewire:common.user-dropdown />
                                @else
                                    <a href="{{ route('signin') }}" wire:navigate aria-label="Sign In" class="flex h-10 w-10 items-center justify-center text-gray-700 transition-colors border border-gray-200 rounded-full hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                                        </svg>
                                    </a>
                                @endauth
            </div>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button class="md:hidden flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
</header>

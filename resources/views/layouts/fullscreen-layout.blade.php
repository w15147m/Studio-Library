<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? 'Dashboard' }} | TailAdmin - Laravel Tailwind CSS Admin Dashboard Template</title>

    <meta name="app-name" content="{{ config('app.name') }}">
    <meta name="app-env" content="{{ config('app.env') }}">

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])

    <!-- Alpine.js -->
    {{-- <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script> --}}

    <!-- Theme Store -->
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.store('theme', {
                init() {
                    this.theme = window.themeManager 
                        ? window.themeManager.getDefaultTheme() 
                        : (localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
                        
                    window.addEventListener('theme-changed', (e) => {
                        this.theme = e.detail.theme;
                    });
                },
                theme: 'light',
                toggle() {
                    if (window.themeManager) {
                        this.theme = window.themeManager.toggleTheme();
                    } else {
                        this.theme = this.theme === 'light' ? 'dark' : 'light';
                        localStorage.setItem('theme', this.theme);
                    }
                }
            });

            Alpine.store('sidebar', {
                // Initialize based on screen size
                isExpanded: window.innerWidth >= 1280, // true for desktop, false for mobile
                isMobileOpen: false,
                isHovered: false,

                toggleExpanded() {
                    this.isExpanded = !this.isExpanded;
                    // When toggling desktop sidebar, ensure mobile menu is closed
                    this.isMobileOpen = false;
                },

                toggleMobileOpen() {
                    this.isMobileOpen = !this.isMobileOpen;
                    // Don't modify isExpanded when toggling mobile menu
                },

                setMobileOpen(val) {
                    this.isMobileOpen = val;
                },

                setHovered(val) {
                    // Only allow hover effects on desktop when sidebar is collapsed
                    if (window.innerWidth >= 1280 && !this.isExpanded) {
                        this.isHovered = val;
                    }
                }
            });
        });
    </script>

    <!-- Apply dark mode immediately to prevent flash -->
    <script>
        (function() {
            const savedTheme = localStorage.getItem('theme');
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const theme = savedTheme || systemTheme;
            
            function applyTheme() {
                const html = document.documentElement;
                const body = document.body;
                
                if (theme === 'dark') {
                    html.classList.add('dark');
                    if (body) {
                        body.classList.add('dark', 'bg-gray-900');
                    }
                } else {
                    html.classList.remove('dark');
                    if (body) {
                        body.classList.remove('dark', 'bg-gray-900');
                    }
                }
            }
            
            // Apply immediately if body exists
            if (document.body) {
                applyTheme();
            } else {
                // Otherwise wait for DOM to be ready
                document.addEventListener('DOMContentLoaded', applyTheme);
            }
            
            // Re-apply theme after Livewire navigation
            document.addEventListener('livewire:navigated', () => {
                const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                const html = document.documentElement;
                const body = document.body;
                
                if (currentTheme === 'dark') {
                    html.classList.add('dark');
                    if (body) body.classList.add('dark', 'bg-gray-900');
                } else {
                    html.classList.remove('dark');
                    if (body) body.classList.remove('dark', 'bg-gray-900');
                }
            });
        })();
    </script>
    @stack('styles')
    @livewireStyles
</head>

<body x-data="{ 'loaded': true}" x-init="$store.sidebar.isExpanded = window.innerWidth >= 1280;
const checkMobile = () => {
    if (window.innerWidth < 1280) {
        $store.sidebar.setMobileOpen(false);
        $store.sidebar.isExpanded = false;
    } else {
        $store.sidebar.isMobileOpen = false;
        $store.sidebar.isExpanded = true;
    }
};
window.addEventListener('resize', checkMobile);
// Ensure preloader hides even if DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => loaded = false, 350);
} else {
    window.addEventListener('DOMContentLoaded', () => {setTimeout(() => loaded = false, 350)});
}">

    {{-- preloader --}}
    @persist('preloader')
        @include('livewire.common.components.preloader')
    @endpersist
    {{-- preloader end --}}

    @yield('content')

</body>

@livewireScripts
@stack('scripts')

</html>

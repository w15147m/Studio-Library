<!-- Floating Scroll to Top Button Component -->
<div x-data="{ 
        showButton: false, 
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }"
    x-init="window.addEventListener('scroll', () => { showButton = window.pageYOffset > 500 })"
    class="fixed bottom-8 right-8 z-[60]"
    x-cloak>
    <button 
        x-show="showButton"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 translate-y-4 scale-95"
        x-transition:enter-end="opacity-100 translate-y-0 scale-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 translate-y-0 scale-100"
        x-transition:leave-end="opacity-0 translate-y-4 scale-95"
        @click="scrollToTop"
        class="flex items-center justify-center w-12 h-12 text-white bg-brand-500 rounded-full shadow-lg transition-all hover:bg-brand-600 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-brand-500/30"
        aria-label="Scroll to top">
        <svg class="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>
</div>

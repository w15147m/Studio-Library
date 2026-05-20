{{-- CTA Section --}}
<section class="bg-gray-900 py-20 border-t border-gray-800">
    <div class="max-w-screen-xl mx-auto px-4 xl:px-8 text-center">

        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to explore the library?
        </h2>
        <p class="text-gray-400 text-base max-w-lg mx-auto mb-10">
            No account needed. Jump straight in and start watching or listening right now.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
                href="{{ route('videos') }}"
                wire:navigate
                class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Watch Videos
            </a>
            <a
                href="{{ route('audios') }}"
                wire:navigate
                class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-all"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
                Listen to Audios
            </a>
        </div>

    </div>
</section>

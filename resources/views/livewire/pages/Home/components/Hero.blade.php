{{-- Hero Section --}}
<section class="relative overflow-hidden bg-gray-900 text-white">

    {{-- Background gradient orbs --}}
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative max-w-screen-xl mx-auto px-4 xl:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16">

        {{-- Left: Text --}}
        <div class="flex-1 text-center lg:text-left">
            <span class="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-widest uppercase">
                🎬 Your Personal Media Hub
            </span>

            <h1 class="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                Studio
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Library</span>
            </h1>

            <p class="text-gray-400 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Stream, organize, and enjoy your entire collection of videos and audio tracks — beautifully, in one place.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                    href="{{ route('videos') }}"
                    wire:navigate
                    class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30"
                >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Browse Videos
                </a>
                <a
                    href="{{ route('audios') }}"
                    wire:navigate
                    class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-all"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                    </svg>
                    Listen to Audios
                </a>
            </div>
        </div>

        {{-- Right: Visual --}}
        <div class="flex-1 flex items-center justify-center w-full max-w-lg lg:max-w-none">
            <div class="relative w-full max-w-md">

                {{-- Fake player card --}}
                <div class="rounded-2xl bg-gray-800/80 border border-gray-700 backdrop-blur p-5 shadow-2xl">

                    {{-- Now playing bar --}}
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-white truncate">Studio Library</p>
                            <p class="text-xs text-gray-400 truncate">Your media, your way</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                            <span class="text-xs text-teal-400 font-medium">Live</span>
                        </div>
                    </div>

                    {{-- Progress bar --}}
                    <div class="mb-4">
                        <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div class="h-full w-2/3 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full"></div>
                        </div>
                        <div class="flex justify-between mt-1.5 text-xs text-gray-500">
                            <span>2:14</span>
                            <span>3:42</span>
                        </div>
                    </div>

                    {{-- Controls --}}
                    <div class="flex items-center justify-center gap-6">
                        <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                        <div class="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        </div>
                        <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </div>

                    {{-- Track list preview --}}
                    <div class="mt-5 space-y-2.5">
                        @foreach(['Midnight Drive', 'Neon Rain', 'Deep Focus'] as $i => $track)
                            <div class="flex items-center gap-3 px-3 py-2 rounded-xl {{ $i === 0 ? 'bg-teal-500/10 border border-teal-500/20' : 'hover:bg-gray-700/50' }} transition-colors">
                                <span class="text-xs text-gray-500 w-4 text-center">{{ $i + 1 }}</span>
                                <div class="flex-1">
                                    <p class="text-xs font-medium {{ $i === 0 ? 'text-teal-400' : 'text-gray-300' }}">{{ $track }}</p>
                                </div>
                                @if($i === 0)
                                    <div class="flex gap-0.5 items-end h-4">
                                        <div class="w-0.5 bg-teal-400 rounded animate-bounce h-2" style="animation-delay:0ms"></div>
                                        <div class="w-0.5 bg-teal-400 rounded animate-bounce h-4" style="animation-delay:150ms"></div>
                                        <div class="w-0.5 bg-teal-400 rounded animate-bounce h-3" style="animation-delay:300ms"></div>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- Decorative floating badge --}}
                <div class="absolute -top-4 -right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    HLS Streaming ✓
                </div>
            </div>
        </div>

    </div>
</section>

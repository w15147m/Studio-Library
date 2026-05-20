<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-(--breakpoint-2xl) mx-auto px-4 xl:px-8 py-10">

        <!-- Page Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">🎬 Videos</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">Browse and watch all available videos.</p>
        </div>

        @if($videos->isEmpty())
            <div class="flex flex-col items-center justify-center py-24 text-center">
                <svg class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                </svg>
                <p class="text-gray-500 dark:text-gray-400 text-lg font-medium">No videos yet.</p>
                <p class="text-gray-400 dark:text-gray-500 text-sm mt-1">Check back later.</p>
            </div>
        @else
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                @foreach($videos as $video)
                    <div
                        x-data="{ open: false }"
                        class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                    >
                        <!-- Thumbnail / Player Trigger -->
                        <div
                            @click="open = true"
                            class="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden"
                        >
                            <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                                <div class="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center ring-2 ring-white/40">
                                    <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="absolute bottom-2 right-2">
                                @if($video['is_transcoded'])
                                    <span class="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full font-medium">HLS</span>
                                @else
                                    <span class="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full font-medium">Processing…</span>
                                @endif
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-900 dark:text-white text-sm truncate">{{ $video['title'] }}</h3>
                        </div>

                        <!-- Video Modal -->
                        <div
                            x-show="open"
                            x-cloak
                            @keydown.escape.window="open = false"
                            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        >
                            <div @click.outside="open = false" class="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                                <button
                                    @click="open = false"
                                    class="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <div class="aspect-video w-full">
                                    <video
                                        x-show="open"
                                        controls
                                        autoplay
                                        class="w-full h-full"
                                        :src="'{{ $video['url'] }}'"
                                    ></video>
                                </div>
                                <div class="p-4">
                                    <p class="text-white font-semibold text-sm">{{ $video['title'] }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif

    </div>
</div>

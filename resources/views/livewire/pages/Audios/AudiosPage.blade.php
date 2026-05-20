<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-(--breakpoint-2xl) mx-auto px-4 xl:px-8 py-10">

        <!-- Page Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">🎵 Audios</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">Browse and listen to all available tracks.</p>
        </div>

        @if($audios->isEmpty())
            <div class="flex flex-col items-center justify-center py-24 text-center">
                <svg class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
                <p class="text-gray-500 dark:text-gray-400 text-lg font-medium">No audio tracks yet.</p>
                <p class="text-gray-400 dark:text-gray-500 text-sm mt-1">Check back later.</p>
            </div>
        @else
            <div class="flex flex-col gap-3">
                @foreach($audios as $index => $audio)
                    <div
                        x-data="audioPlayer('{{ $audio['url'] }}')"
                        class="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl px-5 py-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <!-- Track Number -->
                        <span class="text-xs font-mono text-gray-400 dark:text-gray-500 w-5 text-center select-none">{{ $index + 1 }}</span>

                        <!-- Play / Pause Button -->
                        <button
                            @click="toggle()"
                            class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-colors shadow"
                        >
                            <svg x-show="!playing" class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg x-show="playing" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                        </button>

                        <!-- Title & Progress -->
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ $audio['title'] }}</p>
                            <div class="mt-2 flex items-center gap-2">
                                <span class="text-xs text-gray-400 dark:text-gray-500 tabular-nums w-10" x-text="currentTime"></span>
                                <input
                                    type="range"
                                    min="0"
                                    :max="duration"
                                    :value="progress"
                                    @input="seek($event.target.value)"
                                    class="flex-1 h-1.5 accent-teal-500 cursor-pointer"
                                />
                                <span class="text-xs text-gray-400 dark:text-gray-500 tabular-nums w-10 text-right" x-text="totalTime"></span>
                            </div>
                        </div>

                        <!-- Hidden audio element -->
                        <audio
                            x-ref="audio"
                            :src="src"
                            @timeupdate="onTimeUpdate()"
                            @loadedmetadata="onLoaded()"
                            @ended="playing = false"
                        ></audio>
                    </div>
                @endforeach
            </div>
        @endif

    </div>
</div>

<script>
    function audioPlayer(src) {
        return {
            src,
            playing: false,
            progress: 0,
            duration: 0,
            currentTime: '0:00',
            totalTime: '0:00',

            toggle() {
                if (this.playing) {
                    this.$refs.audio.pause();
                } else {
                    // Pause all other players on the page
                    document.querySelectorAll('audio').forEach(a => {
                        if (a !== this.$refs.audio) a.pause();
                    });
                    this.$refs.audio.play();
                }
                this.playing = !this.playing;
            },

            seek(val) {
                this.$refs.audio.currentTime = val;
                this.progress = val;
            },

            onTimeUpdate() {
                this.progress = this.$refs.audio.currentTime;
                this.currentTime = this.format(this.$refs.audio.currentTime);
            },

            onLoaded() {
                this.duration = this.$refs.audio.duration;
                this.totalTime = this.format(this.$refs.audio.duration);
            },

            format(secs) {
                if (isNaN(secs)) return '0:00';
                const m = Math.floor(secs / 60);
                const s = Math.floor(secs % 60).toString().padStart(2, '0');
                return `${m}:${s}`;
            },
        };
    }
</script>

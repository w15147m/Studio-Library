import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
    audioId: string;
    title: string;
    filename: string;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
    audioId, 
    title, 
    filename, 
    onClose,
    onPrev,
    onNext,
    hasPrev = false,
    hasNext = false
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const streamUrl = `/admin/audios/stream/${audioId}`;

    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setPlaybackRate(1);
        setMenuOpen(false);

        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.log('Playback failed, waiting for user interaction:', e));
        }
    }, [audioId]);

    // Handle play/pause
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.error(e));
        }
    };

    // Format time (seconds to mm:ss)
    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle time update
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle loaded metadata
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Handle audio ended
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        // Automatically play next track if available
        if (hasNext && onNext) {
            onNext();
        }
    };

    // Handle seek/scrub
    const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };

    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    // Close settings popover on clicking outside the player container
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    // Collapsed/Mini view UI
    if (isCollapsed) {
        return (
            <div 
                ref={containerRef}
                className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-40 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-full py-3 px-5 shadow-2xl text-white flex items-center justify-between animate-in fade-in zoom-in duration-200"
            >
                {/* Hidden native audio tag */}
                <audio
                    ref={audioRef}
                    src={streamUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    preload="auto"
                />

                {/* Collapsed view left icon & title */}
                <div className="flex items-center gap-2.5 overflow-hidden min-w-0 pr-2">
                    <svg className={`size-4.5 text-brand-500 shrink-0 ${isPlaying ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <div className="overflow-hidden truncate text-xs font-semibold select-none">
                        {title}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-white/10">
                    <button 
                        onClick={togglePlay}
                        className="p-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full transition cursor-pointer"
                    >
                        {isPlaying ? (
                            <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="size-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>

                    <button 
                        onClick={() => setIsCollapsed(false)}
                        className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
                        title="Expand Player"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                    </button>

                    <button 
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-white/10 transition cursor-pointer"
                        title="Close Player"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-40 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl text-white animate-in slide-in-from-bottom-6 duration-300"
        >
            {/* Hidden native audio tag */}
            <audio
                ref={audioRef}
                src={streamUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="auto"
            />

            {/* Header info */}
            <div className="flex items-start justify-between mb-4">
                <div className="overflow-hidden pr-4">
                    <h4 className="font-bold text-sm text-white truncate" title={title}>{title}</h4>
                    <span className="text-xs text-gray-400 font-mono truncate block" title={filename}>{filename}</span>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                    <button 
                        onClick={() => setIsCollapsed(true)} 
                        className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
                        title="Minimize Player"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 13H5" />
                        </svg>
                    </button>
                    <button 
                        onClick={onClose} 
                        className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
                        title="Close Player"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Equalizer animation bar overlay if playing */}
            <div className="flex items-center gap-1 h-6 mb-4 justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                    <span
                        key={bar}
                        className={`w-1 bg-brand-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1.5'}`}
                        style={{
                            height: isPlaying ? `${Math.floor(Math.random() * 16) + 6}px` : '6px',
                            animationDelay: `${bar * 0.15}s`
                        }}
                    />
                ))}
            </div>

            {/* Scrub Slider */}
            <div className="mb-4">
                <input 
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleScrubChange}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between text-xxs text-gray-400 mt-1.5 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between relative">
                {/* Volume icon and slider */}
                <div className="flex items-center gap-2 group/volume">
                    <svg className="size-4.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500 transition-opacity"
                    />
                </div>

                {/* Left/Right switching and Play/Pause Controls */}
                <div className="flex items-center gap-3.5">
                    {/* Previous Button */}
                    <button 
                        onClick={onPrev} 
                        disabled={!hasPrev} 
                        className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition cursor-pointer"
                        title="Previous Track"
                    >
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>
                    </button>

                    {/* Play / Pause */}
                    <button 
                        onClick={togglePlay}
                        className="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
                    >
                        {isPlaying ? (
                            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="size-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>

                    {/* Next Button */}
                    <button 
                        onClick={onNext} 
                        disabled={!hasNext} 
                        className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition cursor-pointer"
                        title="Next Track"
                    >
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 6h2v12h-2zm-10.5 12l8.5-6-8.5-6z"/>
                        </svg>
                    </button>
                </div>

                {/* Speed settings cog (YouTube Style) */}
                <div className="relative">
                    <button 
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer group"
                        title="Playback Speed"
                    >
                        <svg className="size-5 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* Playback Speed Popover (Aligns on top of cog) */}
                    {menuOpen && (
                        <div className="absolute bottom-10 right-0 z-50 w-44 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl text-white animate-in slide-in-from-bottom-2 duration-150">
                            <div className="px-2.5 py-1 text-xxs font-bold uppercase tracking-wider text-white/50">
                                Speed
                            </div>
                            <div className="h-[1px] bg-white/10 my-1"></div>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                <button
                                    key={rate}
                                    onClick={() => {
                                        setPlaybackRate(rate);
                                        if (audioRef.current) audioRef.current.playbackRate = rate;
                                        setMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl transition cursor-pointer text-left ${playbackRate === rate ? 'bg-brand-500 font-bold text-white' : 'hover:bg-white/10'}`}
                                >
                                    <span>{rate === 1 ? '1.0x (Normal)' : `${rate}x`}</span>
                                    {playbackRate === rate && <span className="text-xxs">✓</span>}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;

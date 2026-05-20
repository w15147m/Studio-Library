import React, { useEffect, useRef, useState } from 'react';

interface PlayerControlsProps {
    isPlaying: boolean;
    togglePlay: () => void;
    volume: number;
    onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    playbackRate: number;
    onPlaybackRateChange: (rate: number) => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
    isPlaying,
    togglePlay,
    volume,
    onVolumeChange,
    playbackRate,
    onPlaybackRateChange,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
}) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const speedMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className="flex items-center justify-between relative">
            {/* Volume slider */}
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
                    onChange={onVolumeChange}
                    className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500 transition-opacity"
                />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3.5">
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

            {/* Speed Settings */}
            <div className="relative" ref={speedMenuRef}>
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

                {menuOpen && (
                    <div className="absolute bottom-10 right-0 z-50 w-44 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl text-white animate-in slide-in-from-bottom-2 duration-150">
                        <div className="px-2.5 py-1 text-xxs font-bold uppercase tracking-wider text-white/50">Speed</div>
                        <div className="h-[1px] bg-white/10 my-1"></div>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                                key={rate}
                                onClick={() => {
                                    onPlaybackRateChange(rate);
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
    );
};

export default PlayerControls;

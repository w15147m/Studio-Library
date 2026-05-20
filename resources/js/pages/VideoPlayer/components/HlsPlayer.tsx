import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
    url: string;
    isTranscoded: boolean;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ url, isTranscoded }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [levels, setLevels] = useState<{ id: number; height: number; bitrate: number }[]>([]);
    const [currentLevel, setCurrentLevel] = useState<number>(-1); // -1 is Auto
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    
    // UI Popover States
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [activeSubMenu, setActiveSubMenu] = useState<'main' | 'quality' | 'speed'>('main');

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset state
        setLevels([]);
        setCurrentLevel(-1);
        setPlaybackRate(1);
        setMenuOpen(false);
        setActiveSubMenu('main');

        // If it's an HLS stream (m3u8)
        if (url.endsWith('.m3u8')) {
            if (Hls.isSupported()) {
                const hls = new Hls({
                    autoStartLoad: true,
                    startLevel: -1, // Auto
                });

                hlsRef.current = hls;
                hls.loadSource(url);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    const mappedLevels = hls.levels.map((level, index) => ({
                        id: index,
                        height: level.height,
                        bitrate: level.bitrate,
                    }));
                    setLevels(mappedLevels);
                });

                return () => {
                    hls.destroy();
                    hlsRef.current = null;
                };
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
            }
        } else {
            video.src = url;
        }
    }, [url]);

    // Close popover on clicking outside the container
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
        setActiveSubMenu('main');
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group"
        >
            {/* Custom Settings Gear Button - Hover Overlay */}
            <button 
                onClick={toggleMenu} 
                className="absolute bottom-16 right-[12px] z-20 p-2.5 bg-transparent hover:bg-black/60 text-white/80 hover:text-white rounded-full transition duration-200 cursor-pointer group"
                title="Settings"
            >
                <svg className="size-5 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            {/* Nested Quality & Speed Settings Menu */}
            {menuOpen && (
                <div className="absolute bottom-28 right-[12px] z-30 w-56 bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-2xl text-white animate-in slide-in-from-bottom-2 duration-150">
                    
                    {/* Main Settings Menu */}
                    {activeSubMenu === 'main' && (
                        <div className="space-y-1">
                            {levels.length > 0 && (
                                <button
                                    onClick={() => setActiveSubMenu('quality')}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl hover:bg-white/10 transition text-left cursor-pointer"
                                >
                                    <span>Quality</span>
                                    <span className="text-white/55 font-normal flex items-center gap-1.5">
                                        {currentLevel === -1 ? 'Auto' : `${levels[currentLevel]?.height}p`}
                                        <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            )}
                            <button
                                onClick={() => setActiveSubMenu('speed')}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl hover:bg-white/10 transition text-left cursor-pointer"
                            >
                                <span>Speed</span>
                                <span className="text-white/55 font-normal flex items-center gap-1.5">
                                    {playbackRate === 1 ? 'Normal' : `${playbackRate}x`}
                                    <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    )}

                    {/* Quality Sub-Menu */}
                    {activeSubMenu === 'quality' && (
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveSubMenu('main')}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition text-left cursor-pointer"
                            >
                                <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to settings
                            </button>
                            <div className="h-[1px] bg-white/10 my-1"></div>
                            
                            <button
                                onClick={() => {
                                    setCurrentLevel(-1);
                                    if (hlsRef.current) hlsRef.current.currentLevel = -1;
                                    setMenuOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition cursor-pointer ${currentLevel === -1 ? 'bg-brand-500 font-bold text-white' : 'hover:bg-white/10'}`}
                            >
                                <span>Auto</span>
                                {currentLevel === -1 && <span className="text-xs">✓</span>}
                            </button>
                            
                            {levels.map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => {
                                        setCurrentLevel(level.id);
                                        if (hlsRef.current) hlsRef.current.currentLevel = level.id;
                                        setMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition cursor-pointer ${currentLevel === level.id ? 'bg-brand-500 font-bold text-white' : 'hover:bg-white/10'}`}
                                >
                                    <span>{level.height}p</span>
                                    {currentLevel === level.id && <span className="text-xs">✓</span>}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Speed Sub-Menu */}
                    {activeSubMenu === 'speed' && (
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveSubMenu('main')}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition text-left cursor-pointer"
                            >
                                <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to settings
                            </button>
                            <div className="h-[1px] bg-white/10 my-1"></div>
                            
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                <button
                                    key={rate}
                                    onClick={() => {
                                        setPlaybackRate(rate);
                                        if (videoRef.current) videoRef.current.playbackRate = rate;
                                        setMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition cursor-pointer ${playbackRate === rate ? 'bg-brand-500 font-bold text-white' : 'hover:bg-white/10'}`}
                                >
                                    <span>{rate === 1 ? '1.0x (Normal)' : `${rate}x`}</span>
                                    {playbackRate === rate && <span className="text-xs">✓</span>}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            )}

            {/* Video Player Node with noplaybackrate list */}
            <video
                ref={videoRef}
                className="w-full aspect-video block focus:outline-none"
                controls
                controlsList="noplaybackrate"
                autoPlay
                preload="auto"
                playsInline
            />
        </div>
    );
};

export default HlsPlayer;

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
    url: string;
    isTranscoded: boolean;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ url, isTranscoded }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [levels, setLevels] = useState<{ id: number; height: number; bitrate: number }[]>([]);
    const [currentLevel, setCurrentLevel] = useState<number>(-1); // -1 is Auto
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset state
        setLevels([]);
        setCurrentLevel(-1);
        setPlaybackRate(1);

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

                hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                    // Update state when auto-switching changes level
                    if (hls.autoLevelEnabled) {
                        // Keep currentLevel as -1 (Auto) but we can see the active height if needed
                    }
                });

                return () => {
                    hls.destroy();
                    hlsRef.current = null;
                };
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native Safari support
                video.src = url;
            }
        } else {
            // Normal fallback (MP4 file directly)
            video.src = url;
        }
    }, [url]);

    const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10);
        setCurrentLevel(value);
        if (hlsRef.current) {
            hlsRef.current.currentLevel = value;
        }
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseFloat(e.target.value);
        setPlaybackRate(value);
        if (videoRef.current) {
            videoRef.current.playbackRate = value;
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Top Toolbar overlay for Premium Selectors */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <span className="text-sm font-semibold text-white/95 tracking-wide">
                    {url.endsWith('.m3u8') ? 'HLS Adaptive Stream' : 'Standard MP4 Direct'}
                </span>
                
                <div className="flex items-center gap-4">
                    {/* HLS Resolution Selector */}
                    {levels.length > 0 && (
                        <div className="flex items-center gap-2">
                            <label htmlFor="quality-select" className="text-xs font-medium text-white/60">Quality</label>
                            <select
                                id="quality-select"
                                value={currentLevel}
                                onChange={handleQualityChange}
                                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none transition cursor-pointer"
                            >
                                <option value="-1" className="text-black">Auto</option>
                                {levels.map((level) => (
                                    <option key={level.id} value={level.id} className="text-black">
                                        {level.height}p ({Math.round(level.bitrate / 1000)} kbps)
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Speed Selector */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="speed-select" className="text-xs font-medium text-white/60">Speed</label>
                        <select
                            id="speed-select"
                            value={playbackRate}
                            onChange={handleSpeedChange}
                            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none transition cursor-pointer"
                        >
                            <option value="0.5" className="text-black">0.5x</option>
                            <option value="1" className="text-black">1.0x (Normal)</option>
                            <option value="1.25" className="text-black">1.25x</option>
                            <option value="1.5" className="text-black">1.5x</option>
                            <option value="2" className="text-black">2.0x</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Video Player Element */}
            <video
                ref={videoRef}
                className="w-full aspect-video block focus:outline-none"
                controls
                autoPlay
                preload="auto"
                playsInline
            />
        </div>
    );
};

export default HlsPlayer;

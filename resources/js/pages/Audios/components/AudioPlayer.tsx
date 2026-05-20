import React, { useEffect, useRef, useState } from 'react';
import MiniPlayer from './MiniPlayer';
import Equalizer from './Equalizer';
import TimeSlider from './TimeSlider';
import PlayerControls from './PlayerControls';

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
    audioId, title, filename, onClose, onPrev, onNext, hasPrev = false, hasNext = false 
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setPlaybackRate(1);
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.log('Playback failed, waiting for user interaction:', e));
        }
    }, [audioId]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.error(e));
        }
    };

    const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = val;
            setCurrentTime(val);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val;
    };

    const handlePlaybackRateChange = (rate: number) => {
        setPlaybackRate(rate);
        if (audioRef.current) audioRef.current.playbackRate = rate;
    };

    if (isCollapsed) {
        return (
            <MiniPlayer 
                title={title} isPlaying={isPlaying} togglePlay={togglePlay}
                setIsCollapsed={setIsCollapsed} onClose={onClose}
            />
        );
    }

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-40 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl text-white animate-in slide-in-from-bottom-6 duration-300">
            <audio
                ref={audioRef} src={`/admin/audios/stream/${audioId}`}
                onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
                onEnded={() => { setIsPlaying(false); setCurrentTime(0); if (hasNext && onNext) onNext(); }}
                preload="auto"
            />
            <div className="flex items-start justify-between mb-4">
                <div className="overflow-hidden pr-4">
                    <h4 className="font-bold text-sm text-white truncate" title={title}>{title}</h4>
                    <span className="text-xs text-gray-400 font-mono truncate block" title={filename}>{filename}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setIsCollapsed(true)} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer" title="Minimize Player">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 13H5" /></svg>
                    </button>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer" title="Close Player">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>
            <Equalizer isPlaying={isPlaying} />
            <TimeSlider currentTime={currentTime} duration={duration} onScrubChange={handleScrubChange} />
            <PlayerControls
                isPlaying={isPlaying} togglePlay={togglePlay} volume={volume} onVolumeChange={handleVolumeChange}
                playbackRate={playbackRate} onPlaybackRateChange={handlePlaybackRateChange}
                onPrev={onPrev} onNext={onNext} hasPrev={hasPrev} hasNext={hasNext}
            />
        </div>
    );
};

export default AudioPlayer;

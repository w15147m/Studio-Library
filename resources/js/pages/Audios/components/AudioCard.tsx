import React from 'react';
import { AudioItem } from '../../hooks/useAudios';

interface AudioCardProps {
    audio: AudioItem;
    activeAudio: AudioItem | null;
    onPlay: (audio: AudioItem) => void;
}

const AudioCard: React.FC<AudioCardProps> = ({ audio, activeAudio, onPlay }) => {
    const isPlaying = activeAudio?.id === audio.id;
    
    return (
        <div className={`group bg-white dark:bg-gray-900 border rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-brand-300 dark:hover:border-brand-800 ${
            isPlaying 
                ? 'border-brand-500 dark:border-brand-500 ring-2 ring-brand-500/10' 
                : 'border-gray-200 dark:border-gray-800'
        }`}>
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="size-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                    </div>
                    {isPlaying && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-200 dark:border-brand-800 animate-pulse">
                            Now Playing
                        </span>
                    )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition duration-200 truncate">
                    {audio.title}
                </h3>
                <p className="mt-1.5 text-xs text-gray-450 dark:text-gray-500 font-mono truncate">
                    {audio.filename}
                </p>

                <div className="mt-6">
                    <button
                        onClick={() => onPlay(audio)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200 cursor-pointer"
                    >
                        <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        Play Audio Track
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioCard;

import React from 'react';

interface MiniPlayerProps {
    title: string;
    isPlaying: boolean;
    togglePlay: () => void;
    setIsCollapsed: (val: boolean) => void;
    onClose: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
    title,
    isPlaying,
    togglePlay,
    setIsCollapsed,
    onClose,
}) => {
    return (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-40 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-full py-3 px-5 shadow-2xl text-white flex items-center justify-between animate-in fade-in zoom-in duration-200">
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
};

export default MiniPlayer;

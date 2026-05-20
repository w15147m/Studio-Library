import React from 'react';

interface EqualizerProps {
    isPlaying: boolean;
}

const Equalizer: React.FC<EqualizerProps> = ({ isPlaying }) => {
    return (
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
    );
};

export default Equalizer;

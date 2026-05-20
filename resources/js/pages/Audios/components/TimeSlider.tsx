import React from 'react';

interface TimeSliderProps {
    currentTime: number;
    duration: number;
    onScrubChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({
    currentTime,
    duration,
    onScrubChange,
}) => {
    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="mb-4">
            <input 
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={onScrubChange}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-xxs text-gray-400 mt-1.5 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default TimeSlider;

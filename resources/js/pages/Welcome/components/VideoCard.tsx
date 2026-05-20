import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../hooks/useVideos';

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-gray-750">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="size-12 bg-brand-550 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        video.is_transcoded 
                            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 text-green-600 dark:text-green-400'
                            : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 animate-pulse'
                    }`}>
                        {video.is_transcoded ? 'HLS Ready' : 'Processing HLS'}
                    </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition duration-200 truncate">
                    {video.title}
                </h3>
                <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                    {video.filename}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link 
                        to={`/admin/video/${video.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition duration-200 shadow-sm"
                    >
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        Play HLS (Adaptive)
                    </Link>
                    <Link 
                        to={`/admin/video-stream/${video.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded-xl transition duration-200 shadow-sm"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Play Stream (Range)
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;

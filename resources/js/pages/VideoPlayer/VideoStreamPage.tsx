import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiService from '@/common/services/api.service';

interface Video {
    id: string;
    video_id: string;
    title: string;
    filename: string;
    url: string;
    is_transcoded: boolean;
}

const VideoStreamPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    // UI Popover States
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [playbackRate, setPlaybackRate] = useState<number>(1);

    useEffect(() => {
        apiService.fetchData(`/api/admin/videos/${id}`)
            .then((data: any) => {
                if (data) {
                    setVideo(data);
                } else {
                    setError('Video not found.');
                }
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load video configurations.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="size-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Initializing Range Stream player...</span>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="mx-auto max-w-xl text-center py-16">
                <div className="size-16 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Stream</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{error || 'Unable to locate video resource.'}</p>
                <Link to="/admin" className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-lg transition duration-200">
                    Back to Studio
                </Link>
            </div>
        );
    }

    const streamUrl = `/admin/videos/stream/${video.id}`;

    return (
        <div className="mx-auto max-w-4xl px-4">
            {/* Navigation Header */}
            <div className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 transition duration-200"
                >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Studio
                </button>
                <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700"></div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 rounded-full">
                    Range Stream Player
                </span>
            </div>

            {/* Video Title Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                    {video.title} (Single File Stream)
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                    <span className="font-mono">{video.filename}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-amber-500"></span>
                        HTTP Range Request Pseudo-Streaming
                    </span>
                </p>
            </div>

            {/* Custom Video Container */}
            <div 
                ref={containerRef}
                className="mb-8 relative w-full max-w-4xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group"
            >
                {/* Settings Gear Button - Bottom-Right next to native three dots */}
                <button 
                    onClick={() => setMenuOpen((prev) => !prev)} 
                    className="absolute bottom-16 right-[12px] z-20 p-2.5 bg-transparent hover:bg-black/60 text-white/80 hover:text-white rounded-full transition duration-200 cursor-pointer group"
                    title="Speed Settings"
                >
                    <svg className="size-5 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                {/* Speed Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute bottom-28 right-[12px] z-30 w-52 bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-2xl text-white animate-in slide-in-from-bottom-2 duration-150">
                        <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/50">
                            Playback Speed
                        </div>
                        <div className="h-[1px] bg-white/10 my-1"></div>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                                key={rate}
                                onClick={() => {
                                    setPlaybackRate(rate);
                                    if (videoRef.current) videoRef.current.playbackRate = rate;
                                    setMenuOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition cursor-pointer text-left ${playbackRate === rate ? 'bg-brand-500 font-bold text-white' : 'hover:bg-white/10'}`}
                            >
                                <span>{rate === 1 ? '1.0x (Normal)' : `${rate}x`}</span>
                                {playbackRate === rate && <span className="text-xs">✓</span>}
                            </button>
                        ))}
                    </div>
                )}

                {/* Direct Video Node with controlsList='noplaybackrate' */}
                <video
                    ref={videoRef}
                    className="w-full aspect-video block focus:outline-none"
                    src={streamUrl}
                    controls
                    controlsList="noplaybackrate"
                    autoPlay
                    preload="auto"
                    playsInline
                />
            </div>

            {/* Meta Details Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Stream Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Raw File Path</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono">
                            public/uploads/video/{video.filename}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Partial Content Endpoint</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono overflow-x-auto whitespace-nowrap">
                            {streamUrl}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoStreamPage;

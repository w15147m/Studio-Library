import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiService from '@/common/services/api.service';
import HlsPlayer from './components/HlsPlayer';

interface Video {
    id: string;
    title: string;
    filename: string;
    url: string;
    is_transcoded: boolean;
}

const VideoPlayerPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiService.fetchData('/api/admin/videos')
            .then((data: any) => {
                const foundVideo = data.find((v: Video) => v.id === id);
                if (foundVideo) {
                    setVideo(foundVideo);
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="size-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Initializing premium HLS playback...</span>
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Video</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{error || 'Unable to locate video resource.'}</p>
                <Link to="/admin" className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-lg transition duration-200">
                    Back to Studio
                </Link>
            </div>
        );
    }

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
                <span className="text-xs font-semibold px-2.5 py-1 bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 text-brand-600 dark:text-brand-400 rounded-full">
                    Studio Player
                </span>
            </div>

            {/* Video Title Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                    {video.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                    <span className="font-mono">{video.filename}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                        <span className={`size-2.5 rounded-full ${video.is_transcoded ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        {video.is_transcoded ? 'HLS Adaptive Streaming Enabled' : 'Playing raw source'}
                    </span>
                </p>
            </div>

            {/* HLS Video Player Component */}
            <div className="mb-8">
                <HlsPlayer url={video.url} isTranscoded={video.is_transcoded} />
            </div>

            {/* Premium Meta Details Card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Video Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Storage Path</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono">
                            public/uploads/video/{video.filename}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">HLS Index Link</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono overflow-x-auto whitespace-nowrap">
                            {video.is_transcoded ? `/uploads/video/hls/${video.id}/master.m3u8` : 'Not generated'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;

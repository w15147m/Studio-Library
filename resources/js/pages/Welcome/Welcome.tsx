import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '@/common/services/api.service';

interface Video {
    id: string;
    title: string;
    filename: string;
    url: string;
    is_transcoded: boolean;
}

const Welcome = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        apiService.fetchData('/api/admin/videos')
            .then((data: any) => {
                setVideos(data);
            })
            .catch((err) => {
                console.error('Failed to fetch videos:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="mx-auto max-w-4xl">
            {/* Welcome Banner */}
            <div className="mb-8 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0">
                        <div className="size-20 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
                            <svg className="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                            Welcome to Admin Studio
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed max-w-xl">
                            You are now in your central workspace. Use this area to manage your application, 
                            configure settings, and watch transcoded HLS adaptive video streams.
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Library Section */}
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Studio Video Library</h2>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        {videos.length} Video{videos.length !== 1 && 's'} Detected
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="size-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center shadow-sm">
                        <div className="size-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4 border border-gray-150 dark:border-gray-750">
                            <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">No videos found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            Please upload video files in <code>public/uploads/video/</code> and run <code>php artisan video:transcode-hls</code> to begin.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {videos.map((video) => (
                            <div key={video.id} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-gray-750">
                                {/* Card Body */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="size-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shrink-0">
                                            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                                            video.is_transcoded 
                                                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 text-green-600 dark:text-green-400'
                                                : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400'
                                        }`}>
                                            {video.is_transcoded ? 'HLS Ready' : 'Raw MP4'}
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition duration-200 truncate">
                                        {video.title}
                                    </h3>
                                    <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                                        {video.filename}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between gap-4">
                                        <Link 
                                            to={`/admin/video/${video.id}`}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition duration-200 shadow-sm"
                                        >
                                            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                            Play Video
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                Admin Layout Successfully Integrated
            </div>
        </div>
    );
};

export default Welcome;

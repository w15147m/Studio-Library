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
    
    // Modal & Upload states
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('video', file);

        try {
            const response = await apiService.post('/api/admin/videos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.success && response.video) {
                setVideos((prev) => [response.video, ...prev]);
                // Reset form
                setTitle('');
                setFile(null);
                setIsModalOpen(false);
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            {/* Video Library Section */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-150 dark:border-gray-800">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Studio Video Library</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage and stream your uploaded media files
                        </p>
                    </div>
                    
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 transition duration-200"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Upload Video
                    </button>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                            You have no videos in your studio database yet. Click below to upload your first MP4.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-lg transition duration-200"
                        >
                            Upload First Video
                        </button>
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
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload New Studio Video</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                            >
                                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Video Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter a descriptive title..."
                                    required
                                    className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 dark:text-white outline-none focus:border-brand-500 dark:border-gray-700 focus:ring-2 focus:ring-brand-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Video File
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-950/20 hover:bg-gray-100 dark:hover:bg-gray-950/40 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                {file ? file.name : 'Click to upload video file'}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                MP4, MOV, or AVI up to 100MB
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-150 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-850 rounded-xl transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading || !title || !file}
                                    className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition duration-200"
                                >
                                    {uploading ? 'Uploading & Processing...' : 'Start Transcode'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-12 flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                Admin Layout Successfully Integrated
            </div>
        </div>
    );
};

export default Welcome;

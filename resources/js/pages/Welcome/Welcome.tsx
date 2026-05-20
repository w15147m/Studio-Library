import React from 'react';
import { useVideos } from '../hooks/useVideos';
import VideoCard from './components/VideoCard';
import VideoUploadModal from './components/VideoUploadModal';

const Welcome = () => {
    const {
        videos,
        loading,
        isModalOpen,
        setIsModalOpen,
        title,
        setTitle,
        file,
        handleFileChange,
        handleUploadSubmit,
        uploading,
    } = useVideos();

    return (
        <div className="mx-auto max-w-4xl px-4 pb-12">
            <div className="mt-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-150 dark:border-gray-800">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Studio Video Library</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Upload your MP4 videos to automatically transcode into adaptive HLS streaming format
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 transition duration-200 cursor-pointer"
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
                        <div className="size-16 bg-gray-55 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4 border border-gray-150 dark:border-gray-750">
                            <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">No videos found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                            You have no videos in your library yet. Upload a video file to transcode it.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-lg transition duration-200 cursor-pointer"
                        >
                            Upload First Video
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <VideoUploadModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUploadSubmit}
                    title={title}
                    setTitle={setTitle}
                    file={file}
                    onFileChange={handleFileChange}
                    uploading={uploading}
                />
            )}
        </div>
    );
};

export default Welcome;

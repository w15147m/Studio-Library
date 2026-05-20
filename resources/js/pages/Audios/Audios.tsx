import React from 'react';
import { useAudios } from '../hooks/useAudios';
import AudioCard from './components/AudioCard';
import AudioUploadModal from './components/AudioUploadModal';
import AudioPlayer from './components/AudioPlayer';

const Audios = () => {
    const {
        audios,
        loading,
        isModalOpen,
        setIsModalOpen,
        title,
        setTitle,
        file,
        uploading,
        activeAudio,
        setActiveAudio,
        hasPrev,
        hasNext,
        handlePrev,
        handleNext,
        handleFileChange,
        handleUploadSubmit,
    } = useAudios();

    return (
        <div className="mx-auto max-w-4xl px-4 pb-24">
            <div className="mt-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-150 dark:border-gray-800">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Studio Audio Library</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and stream your uploaded audio tracks</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 transition duration-200 cursor-pointer"
                    >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Upload Audio
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="size-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : audios.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center shadow-sm">
                        <div className="size-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4 border border-gray-150 dark:border-gray-750">
                            <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">No audios found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                            You have no audio files in your database. Click below to upload your first audio track.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-lg transition duration-200 cursor-pointer"
                        >
                            Upload First Audio
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {audios.map((audio) => (
                            <AudioCard 
                                key={audio.id} 
                                audio={audio} 
                                activeAudio={activeAudio}
                                onPlay={setActiveAudio}
                            />
                        ))}
                    </div>
                )}
            </div>

            {activeAudio && (
                <AudioPlayer
                    audioId={activeAudio.id}
                    title={activeAudio.title}
                    filename={activeAudio.filename}
                    onClose={() => setActiveAudio(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                />
            )}

            {isModalOpen && (
                <AudioUploadModal
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

export default Audios;

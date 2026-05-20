import React, { useEffect, useState } from 'react';
import apiService from '@/common/services/api.service';
import AudioPlayer from './components/AudioPlayer';

interface AudioItem {
    id: string;
    title: string;
    filename: string;
    url: string;
}

const Audios = () => {
    const [audios, setAudios] = useState<AudioItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // Modal & Upload states
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    // Selected audio to play
    const [activeAudio, setActiveAudio] = useState<AudioItem | null>(null);

    useEffect(() => {
        apiService.fetchData('/api/admin/audios')
            .then((data: any) => {
                if (Array.isArray(data)) {
                    setAudios(data);
                }
            })
            .catch((err) => {
                console.error('Failed to fetch audios:', err);
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
        formData.append('audio', file);

        try {
            const response = await apiService.post('/api/admin/audios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.success && response.audio) {
                setAudios((prev) => [response.audio, ...prev]);
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
        <div className="mx-auto max-w-4xl px-4 pb-24">
            {/* Page Header */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-150 dark:border-gray-800">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Studio Audio Library</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage and stream your uploaded audio tracks
                        </p>
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
                            <div 
                                key={audio.id} 
                                className={`group bg-white dark:bg-gray-900 border rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-brand-300 dark:hover:border-brand-800 ${
                                    activeAudio?.id === audio.id 
                                        ? 'border-brand-500 dark:border-brand-500 ring-2 ring-brand-500/10' 
                                        : 'border-gray-200 dark:border-gray-800'
                                }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="size-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shrink-0">
                                            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                            </svg>
                                        </div>
                                        {activeAudio?.id === audio.id && (
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-200 dark:border-brand-800 animate-pulse">
                                                Now Playing
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition duration-200 truncate">
                                        {audio.title}
                                    </h3>
                                    <p className="mt-1.5 text-xs text-gray-450 dark:text-gray-500 font-mono truncate">
                                        {audio.filename}
                                    </p>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => setActiveAudio(audio)}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200 cursor-pointer"
                                        >
                                            <svg className="size-4.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                            Play Audio Track
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Audio Player Overlay */}
            {activeAudio && (
                <AudioPlayer
                    audioId={activeAudio.id}
                    title={activeAudio.title}
                    filename={activeAudio.filename}
                    onClose={() => setActiveAudio(null)}
                />
            )}

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload New Studio Audio</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition cursor-pointer"
                            >
                                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="audio-title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Audio Title
                                </label>
                                <input
                                    type="text"
                                    id="audio-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter audio title..."
                                    required
                                    className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 dark:text-white outline-none focus:border-brand-500 dark:border-gray-700 focus:ring-2 focus:ring-brand-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Audio File
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-950/20 hover:bg-gray-100 dark:hover:bg-gray-950/40 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                            </svg>
                                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                {file ? file.name : 'Click to upload audio file'}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                MP3, WAV, M4A, or OGG up to 50MB
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="audio/*"
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
                                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-850 rounded-xl transition duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading || !title || !file}
                                    className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition duration-200 cursor-pointer"
                                >
                                    {uploading ? 'Uploading...' : 'Upload Track'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Audios;

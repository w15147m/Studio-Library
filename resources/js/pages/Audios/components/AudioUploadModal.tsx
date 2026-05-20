import React from 'react';

interface AudioUploadModalProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    setTitle: (val: string) => void;
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploading: boolean;
}

const AudioUploadModal: React.FC<AudioUploadModalProps> = ({
    onClose,
    onSubmit,
    title,
    setTitle,
    file,
    onFileChange,
    uploading,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload New Studio Audio</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition cursor-pointer">
                        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-6">
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
                                    <p className="text-xs text-gray-400">MP3, WAV, M4A, or OGG up to 50MB</p>
                                </div>
                                <input type="file" accept="audio/*" className="hidden" onChange={onFileChange} required />
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-150 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={onClose}
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
    );
};

export default AudioUploadModal;

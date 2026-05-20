import React, { useState } from 'react';
import { funcApi } from '../services/api.service';

const TrashIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    </svg>
);

const UploadIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

const ImageUpload = ({ images = [], onUploadSuccess, onRemove, columns = 3, isSquare = false }) => {
    const [isLoader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const handleFile = async (e) => {
        setError(null);
        const file = e.target.files[0];
        if (!file) return;

        // 2MB limitation check
        if (file.size > 2 * 1024 * 1024) {
            setError("The image must be smaller than 2MB.");
            e.target.value = '';
            return;
        }

        setLoader(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const result = await funcApi.post('/api/tem-images', formData);
            if (result.data) {
                if(onUploadSuccess) onUploadSuccess(result.data);
            } else {
                alert("ImageUpload.jsx: Upload API succeeded, but result.data is missing! Result=" + JSON.stringify(result));
            }
            e.target.value = '';
        } catch (error) {
            console.error("Upload failed", error);
            e.target.value = '';
        } finally {
            setLoader(false);
        }
    };

    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    }[columns] || 'grid-cols-3';

    const aspectClass = isSquare ? 'aspect-square' : 'aspect-[4/5]';

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className={`grid ${gridColsClass} gap-4 w-full`}>
                {/* Upload Button Box */}
                <div className={`w-full ${aspectClass} flex-shrink-0`}>
                    <label className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                        error ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}>
                    {isLoader ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-brand-500 font-medium tracking-wide">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                            <UploadIcon />
                            <div className="text-xs font-semibold uppercase tracking-wider">Upload</div>
                        </div>
                    )}
                    <input type="file" className="hidden" onChange={handleFile} accept="image/*" disabled={isLoader} />
                </label>
            </div>

            {/* Render Existing Images */}
            {images.map((image, index) => (
                <div key={image.id || index} className={`w-full ${aspectClass} flex flex-col flex-shrink-0 relative rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 group`}>
                    <img src={image.image_url || image.url} alt="uploaded" className="w-full h-full object-cover" />
                    
                    {onRemove && (
                        <button
                            type="button"
                            onClick={() => onRemove(image)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                            title="Delete"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ))}
            </div>
            
            {/* Inline Error Message */}
            {error && (
                <div className="text-sm font-medium text-red-500 flex items-center gap-1.5 mt-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

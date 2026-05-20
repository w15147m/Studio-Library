import React, { useEffect, useState } from 'react';
import apiService from '@/common/services/api.service';

export interface AudioItem {
    id: string;
    title: string;
    filename: string;
    url: string;
}

export const useAudios = () => {
    const [audios, setAudios] = useState<AudioItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [activeAudio, setActiveAudio] = useState<AudioItem | null>(null);

    const activeIndex = activeAudio ? audios.findIndex(a => a.id === activeAudio.id) : -1;
    const hasPrev = activeIndex > 0;
    const hasNext = activeIndex < audios.length - 1 && activeIndex !== -1;

    const handlePrev = () => {
        if (hasPrev) {
            setActiveAudio(audios[activeIndex - 1]);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            setActiveAudio(audios[activeIndex + 1]);
        }
    };

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

    const handleUploadSubmit = async (e: React.FormEvent) => {
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

    return {
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
    };
};

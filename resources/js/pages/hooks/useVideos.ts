import React, { useEffect, useState } from 'react';
import apiService from '@/common/services/api.service';

export interface Video {
    id: string;
    title: string;
    filename: string;
    url: string;
    is_transcoded: boolean;
}

export const useVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        apiService.fetchData('/api/admin/videos')
            .then((data: any) => {
                if (Array.isArray(data)) {
                    setVideos(data);
                }
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

    const handleUploadSubmit = async (e: React.FormEvent) => {
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
        videos,
        loading,
        isModalOpen,
        setIsModalOpen,
        title,
        setTitle,
        file,
        setFile,
        uploading,
        handleFileChange,
        handleUploadSubmit,
    };
};

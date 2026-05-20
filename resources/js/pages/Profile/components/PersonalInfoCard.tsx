import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/common/context/AuthContext';
import apiService from '@/common/services/api.service';
import ImageUpload from '@/common/components/ImageUpload';

const PersonalInfoCard = ({ mode = "view", onSuccess, onPhotoChange }) => {
    const { user, login } = useAuth();
    const getAvatarUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        
        // Final user image path (stored in DB) e.g. "uploads/avatars/user.jpg"
        // Temporary image URL (from API) e.g. "http://localhost:8000/storage/uploads/temp/user.jpg"
        if (path.includes('://')) return path; // Already a full URL
        
        return `/storage/${path}`;
    };

    const [loading, setLoading] = useState(false);
    const [uploadedPhoto, setUploadedPhoto] = useState(user?.image ? {
        id: 'existing',
        image_url: getAvatarUrl(user.image)
    } : null);
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    });

    const isEditMode = mode === "edit";

    const handleUploadSuccess = (tempImage) => {
        setUploadedPhoto(tempImage);
        if (onPhotoChange) onPhotoChange(tempImage);
    };

    const handleRemovePhoto = () => {
        setUploadedPhoto(null);
        if (onPhotoChange) onPhotoChange(null);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                ...(uploadedPhoto?.id ? { temp_image_id: uploadedPhoto.id } : {}),
            };

            const response = await apiService.post('/api/profile', payload);
            if (response.user) {
                const token = localStorage.getItem('accessToken');
                login(response.user, token);
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (isEditMode) {
        return (
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-white/[0.03]">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                    Edit Personal Information
                </h4>
                <form onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                        {/* Profile Photo - Left Side in Row */}
                        <div className="w-full lg:w-1/4 xl:w-1/5">
                            <label className="mb-3 block text-sm font-medium text-gray-800 dark:text-white/90">
                                Profile Photo
                            </label>
                            <div className="w-full max-w-[140px]">
                                <ImageUpload
                                    images={uploadedPhoto ? [uploadedPhoto] : []}
                                    onUploadSuccess={handleUploadSuccess}
                                    onRemove={handleRemovePhoto}
                                    columns={1}
                                    isSquare={true}
                                />
                            </div>
                        </div>

                        {/* Form Fields - Right Side in Row */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                        Name
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                        Phone Number
                                    </label>
                                    <input 
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                        placeholder="Enter phone number" 
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90">
                                        Bio
                                    </label>
                                    <input 
                                        type="text"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                                        placeholder="Enter bio" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Link 
                            to="/admin/profile"
                            className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-white/[0.03]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                        Personal Information
                    </h4>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Name</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user?.name || 'N/A'}</p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Email address</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user?.email || 'N/A'}</p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Phone</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user?.phone || '-'}</p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Bio</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user?.bio || '-'}</p>
                        </div>
                    </div>
                </div>

                <Link 
                    to="/admin/profile/edit"
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                >
                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill="currentColor"/>
                    </svg>
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default PersonalInfoCard;

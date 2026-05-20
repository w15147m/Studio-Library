import React from 'react';
import { useAuth } from '@/common/context/AuthContext';
import { cdnUrl } from '@/common/config';

const ProfileCard = ({ previewImage }) => {
    const { user } = useAuth();

    const getAvatarSrc = () => {
        if (previewImage) return previewImage;
        if (!user?.image) return null;
        if (user.image.startsWith('http')) return user.image;
        
        // If cdnUrl is empty, we assume local storage and need to prepend /storage/
        const baseUrl = cdnUrl || '';
        const path = user.image.startsWith('uploads') ? `/storage/${user.image}` : user.image;
        
        return baseUrl ? `${baseUrl}/${user.image}` : path;
    };

    const avatarSrc = getAvatarSrc();

    return (
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                            {avatarSrc ? (
                                <img
                                    src={avatarSrc}
                                    alt="User"
                                    className="h-full w-full object-cover"
                                    onError={(e) => e.target.src = '/images/user/user-01.jpg'}
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-brand-400 to-brand-600 text-white text-2xl font-bold">
                                    {(user?.name || 'U').charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="order-3 xl:order-2">
                        <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                            {user?.name || 'User'}
                        </h4>
                        <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.type || 'Member'}
                            </p>
                            <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;

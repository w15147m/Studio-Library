import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageBreadcrumb from '@/common/components/PageBreadcrumb';
import ProfileCard from './components/ProfileCard';
import PersonalInfoCard from './components/PersonalInfoCard';
import ChangePasswordCard from './components/ChangePasswordCard';

const EditProfile = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = React.useState(null);

    const handleSuccess = () => {
        navigate('/admin/profile');
    };

    const handlePhotoChange = (photoObj) => {
        if (photoObj) {
            setPreviewImage(photoObj.image_url);
        } else {
            setPreviewImage(null);
        }
    };

    return (
        <div className="max-w-7xl">
            <PageBreadcrumb pageTitle="Edit Profile" />
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <ProfileCard previewImage={previewImage} />
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                    <PersonalInfoCard 
                        mode="edit" 
                        onSuccess={handleSuccess}
                        onPhotoChange={handlePhotoChange}
                    />

                    <ChangePasswordCard />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

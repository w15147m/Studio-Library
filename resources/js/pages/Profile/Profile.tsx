import React from 'react';
import PageBreadcrumb from '@/common/components/PageBreadcrumb';
import ProfileCard from './components/ProfileCard';
import PersonalInfoCard from './components/PersonalInfoCard';
import ChangePasswordCard from './components/ChangePasswordCard';

const Profile = () => {
    return (
        <div className="max-w-7xl">
            <PageBreadcrumb pageTitle="User Profile" />
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <ProfileCard />
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                    <PersonalInfoCard mode="view" />
                    <ChangePasswordCard />
                </div>
            </div>
        </div>
    );
};

export default Profile;

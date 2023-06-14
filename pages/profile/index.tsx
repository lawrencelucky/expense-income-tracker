import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';
import ProfileSection from '@/components/pageComponents/Dashboard/Profile/ProfileSection';

const ProfilePage = () => {
    return (
        <MainLayout title="Profile">
            <PageHead title="Profile" />
            <ProfileSection />
        </MainLayout>
    );
};

export default ProfilePage;

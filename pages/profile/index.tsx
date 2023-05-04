import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const ProfilePage = () => {
    return (
        <MainLayout title="Profile">
            <PageHead title="Profile" />
            <Typography.Text>Profile</Typography.Text>
        </MainLayout>
    );
};

export default ProfilePage;

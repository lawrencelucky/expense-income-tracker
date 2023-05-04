import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const SettingsPage = () => {
    return (
        <MainLayout title="Settings">
            <PageHead title="Settings" />
            <Typography.Text>Settings</Typography.Text>
        </MainLayout>
    );
};

export default SettingsPage;

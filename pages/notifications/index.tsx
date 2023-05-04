import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const NotificationsPage = () => {
    return (
        <MainLayout title="Notifications">
            <PageHead title="Notifications" />
            <Typography.Text>Notifications</Typography.Text>
        </MainLayout>
    );
};

export default NotificationsPage;

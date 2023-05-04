import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const ActivitiesPage = () => {
    return (
        <MainLayout title="Activities">
            <PageHead title="Activities" />
            <Typography.Text>Activities</Typography.Text>
        </MainLayout>
    );
};

export default ActivitiesPage;

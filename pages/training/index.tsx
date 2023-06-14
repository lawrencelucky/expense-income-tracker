import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const TrainingPage = () => {
    return (
        <MainLayout title="Training">
            <PageHead title="Training" />
            <Typography.Text>Training</Typography.Text>
        </MainLayout>
    );
};

export default TrainingPage;

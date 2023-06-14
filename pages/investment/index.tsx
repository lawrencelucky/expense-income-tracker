import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const InvestmentPage = () => {
    return (
        <MainLayout title="Investment">
            <PageHead title="Investment" />
            <Typography.Text>Investment</Typography.Text>
        </MainLayout>
    );
};

export default InvestmentPage;

import React from 'react';
import { Typography } from 'antd';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';

const LoansPage = () => {
    return (
        <MainLayout title="Loans">
            <PageHead title="Loans" />
            <Typography.Text>Loans</Typography.Text>
        </MainLayout>
    );
};

export default LoansPage;

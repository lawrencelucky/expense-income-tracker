import PageHead from '@/components/common/components/PageHead';
import MainLayout from '@/components/layouts/MainLayout';
import DashboardSection from '@/components/pageComponents/Dashboard/DashboardSection';
import React from 'react';

const DashboardPage = () => {
    return (
        <MainLayout title="Dashboard">
            <PageHead title="Dashboard" />
            <DashboardSection />
        </MainLayout>
    );
};

export default DashboardPage;

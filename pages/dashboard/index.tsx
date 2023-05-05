import PageHead from '@/components/common/components/PageHead';
import MainLayout from '@/components/layouts/MainLayout';
import DashboardSection from '@/components/pageComponents/Dashboard/DashboardSection';
import React, { useState } from 'react';

const DashboardPage = () => {
    const [openAddFarmModal, setOpenAddFarmModal] = useState(false);

    const handleAddFarm = () => {
        setOpenAddFarmModal(true);
    };

    return (
        <MainLayout title="Dashboard" handleClick={handleAddFarm} hasButton btnText="Add Farm">
            <PageHead title="Dashboard" />
            <DashboardSection openAddFarmModal={openAddFarmModal} setOpenAddFarmModal={setOpenAddFarmModal} />
        </MainLayout>
    );
};

export default DashboardPage;

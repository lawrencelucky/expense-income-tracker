import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import PageHead from '@/components/common/components/PageHead';
import WalletSection from '@/components/pageComponents/Wallet/WalletSection';

const WalletPage = () => {
    return (
        <MainLayout title="Wallet">
            <PageHead title="Wallet" />
            <WalletSection />
        </MainLayout>
    );
};

export default WalletPage;

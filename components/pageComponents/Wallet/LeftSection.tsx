import React from 'react';
import WalletTransactionTable from './WalletTransactions';
import WalletDetails from './WalletDetails';

const LeftSection = () => {
    return (
        <div className="space-y-[3rem]">
            <WalletDetails />
            <WalletTransactionTable />
        </div>
    );
};

export default LeftSection;

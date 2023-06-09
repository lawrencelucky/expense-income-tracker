import React from 'react';
import AgentCard from './AgentCard';
import WalletChart from './WalletChart';

const RightSection = () => {
    return (
        <div className="space-y-6">
            <WalletChart />
            <AgentCard />
        </div>
    );
};

export default RightSection;

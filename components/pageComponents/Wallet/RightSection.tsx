import React from 'react';
import AgentCard from './AgentCard';
import WalletChart from './WalletChart';
import useUser from '@/hooks/useUser';

const RightSection = () => {
    const { data } = useUser();

    return (
        <div className="space-y-6">
            <WalletChart />
            {data?.data.primary_agent && <AgentCard />}
        </div>
    );
};

export default RightSection;

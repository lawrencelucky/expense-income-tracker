import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const WalletSection = () => {
    return (
        <div className="flex w-full space-x-6">
            <div className="w-[70%]">
                <LeftSection />
            </div>
            <div className="w-[30%]">
                <RightSection />
            </div>
        </div>
    );
};

export default WalletSection;

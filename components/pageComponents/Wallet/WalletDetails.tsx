import icons from '@/icons';
import { Typography } from 'antd';
import React from 'react';

const WalletDetails = () => {
    return (
        <div className="flex space-x-6">
            <div className="border border-novelgray-60 shadow-20 py-3 px-6 flex-1 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <Typography.Text className="text-sm text-novelgray-40 font-medium">Balance</Typography.Text>
                    <span className="cursor-pointer">{icons.moreIcon()}</span>
                </div>

                <Typography.Text className="text-base font-bold text-novelblack-10">₦0.00</Typography.Text>
            </div>
            <div className="border border-novelgray-60 shadow-20 py-3 px-6 flex-1 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <Typography.Text className="text-sm text-novelgray-40 font-medium">Bank</Typography.Text>
                    <span className="cursor-pointer">{icons.moreIcon()}</span>
                </div>

                <Typography.Text className="text-base font-bold text-novelblack-10">
                    Garba Felix - <span className="text-novelgray-70">3023 **** ****</span>
                </Typography.Text>
            </div>
        </div>
    );
};

export default WalletDetails;

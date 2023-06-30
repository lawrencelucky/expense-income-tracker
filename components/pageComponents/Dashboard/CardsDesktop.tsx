import React from 'react';
import { Typography } from 'antd';
import icons from '@/icons';

const CardsDesktop = () => {
    return (
        <div className="grid grid-cols-4 gap-6">
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">Balance</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-1">
                    <Typography.Text className="text-lg">₦0</Typography.Text>
                    <div className="flex justify-end">
                        {/* <Typography.Text>Recurring Revenue</Typography.Text> */}
                        <span>{icons.progressIconGreen()}</span>
                    </div>
                </div>
            </div>
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">No of farms</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-1">
                    <Typography.Text className="text-lg">4</Typography.Text>
                    <div className="flex justify-end">
                        {/* <Typography.Text>In total</Typography.Text> */}
                        <span>{icons.progressIconGreen()}</span>
                    </div>
                </div>
            </div>
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">No of Crops</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-1">
                    <Typography.Text className="text-lg">500</Typography.Text>
                    <div className="flex justify-end">
                        {/* <Typography.Text>In total</Typography.Text> */}
                        <span>{icons.progressIconGreen()}</span>
                    </div>
                </div>
            </div>
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">Stock Quantity</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-2">
                    <Typography.Text className="text-lg">23,456</Typography.Text>
                    <div className="flex justify-end">
                        {/* <Typography.Text>In total</Typography.Text> */}
                        <span>{icons.progressIconGreen()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsDesktop;

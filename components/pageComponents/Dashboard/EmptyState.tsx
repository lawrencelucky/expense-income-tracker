import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <Typography.Text className="text-novelblack-10 block mb-3 text-2xl">No Dashboard yet</Typography.Text>
            <Typography.Text className="text-novelgray-30 text-center w-[410px] text-base">
                Once your farm details have been populated, use Dashboards to track your stock details
            </Typography.Text>
            <div className="relative w-[325px] h-[141px] mt-6">
                <Image src="/svgs/empty_state_dashboard.svg" alt="empty state" fill />
            </div>
        </div>
    );
};

export default EmptyState;

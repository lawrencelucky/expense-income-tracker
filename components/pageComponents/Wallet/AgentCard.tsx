import useUser from '@/hooks/useUser';
import icons from '@/icons';
import { Avatar, Typography } from 'antd';
import React from 'react';

const AgentCard = () => {
    const { data } = useUser();

    return (
        <div className="border border-novelgray-60 rounded-[18px] shadow-20 p-3 space-y-3">
            <div className="flex items-start justify-between">
                <Avatar className="bg-white shadow-50 border border-novelgray-60 w-[54px] h-[54px] rounded-full flex items-center justify-center">
                    <span className="text-novelgreen-40 text-lg font-bold">
                        {data?.data.primary_agent?.first_name.substring(0, 1)}
                        {data?.data.primary_agent?.last_name.substring(0, 1)}
                    </span>
                </Avatar>
                <div className="bg-novelyellow-20 border border-novelyellow-30 px-2 rounded-full">
                    <span className="text-novelyellow-40 font-bold text-xs">Agent</span>
                </div>
            </div>

            <div className="bg-novelgray-50 rounded-xl p-3">
                <Typography.Text className="text-base font-bold text-novelgray-40 mb-3 block">
                    {data?.data.primary_agent?.first_name} {data?.data.primary_agent?.last_name}
                </Typography.Text>
                <div className="space-x-2 flex">
                    <div className="flex-1 bg-white shadow-50 rounded-lg py-2 flex justify-center items-center space-x-2 cursor-pointer">
                        <span>{icons.phoneIcon()}</span>
                        <Typography.Text className="text-novelgray-40 text-sm">Call Agent</Typography.Text>
                    </div>

                    <div className="flex-1 bg-white shadow-50 rounded-lg py-2 flex justify-center items-center space-x-2 cursor-pointer">
                        <span>{icons.mailIcon()}</span>
                        <Typography.Text className="text-novelgray-40 text-sm">Send email</Typography.Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentCard;

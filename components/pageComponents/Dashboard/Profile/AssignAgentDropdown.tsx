import React from 'react';
import { Button, Dropdown, Typography, Menu } from 'antd';
import Image from 'next/image';
import icons from '@/icons';

const AssignAgentDropdown = () => {
    const agentMenu = (
        <Menu className="border border-novelgray-60 rounded-[18px] shadow-20 w-[258px] h-[180px] p-3 space-y-3">
            <div className="mx-[12px]">
                <div className="flex items-start justify-between mb-[8px]">
                    <div className="bg-white shadow-50 border border-novelgray-60 w-[54px] h-[54px] rounded-full flex items-center justify-center mt-[12px]">
                        <span className="text-novelgreen-40 text-lg font-bold">GR</span>
                    </div>
                    <div className="bg-novelyellow-20 border border-novelyellow-30 px-2 py-0 rounded-full mt-[12px]">
                        <span className="text-novelyellow-40 font-bold text-xs">Agent</span>
                    </div>
                </div>
                <div className="bg-novelgray-50 rounded-xl p-3">
                    <Typography.Text className="text-base font-bold text-novelgray-40 mb-3 block">
                        Gabar Rufus
                    </Typography.Text>
                    <div className="space-x-2 flex">
                        <a href={`tel:0900000000`}>
                            <div className="flex-1 bg-white shadow-50 rounded-lg py-2 flex justify-center items-center space-x-2 cursor-pointer px-1">
                                <span>{icons.phoneIcon()}</span>
                                <Typography.Text className="text-novelgray-40 text-sm">Call Agent</Typography.Text>
                            </div>
                        </a>

                        <a href={`mailto:gargba@novelg.com`}>
                            <div className="flex-1 bg-white shadow-50 rounded-lg py-2 flex justify-center items-center space-x-2 cursor-pointer px-[1px]">
                                <span>{icons.mailIcon()}</span>
                                <Typography.Text className="text-novelgray-40 text-sm">Send email</Typography.Text>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </Menu>
    );

    return (
        <Dropdown overlay={agentMenu} trigger={['click']}>
            <Button className="rounded-full flex bg-[#e9f9f1] w-[150px] h-[44px] border-0">
                <div className="mt-2 flex justify-center items-center">
                    <Image src="/svgs/assignedAgentChatBubble.svg" alt="icon" width={14} height={12} className="mr-2" />
                    <Typography.Text className="">
                        <span className="font-bold text-[#3F3F46] text-[12px]">Assigned Agent</span>
                    </Typography.Text>
                    <span className="mx-2">{icons.carretRightIcon()}</span>
                </div>
            </Button>
        </Dropdown>
    );
};

export default AssignAgentDropdown;

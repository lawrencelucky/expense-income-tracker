import React, { useState } from 'react';
import { Button, Dropdown, Typography, Menu } from 'antd';
import Image from 'next/image';
import icons from '@/icons';
import ProfilePicture from '../Dashboard/ProfilePicture';

const AssignAgentDropdown = (user: any) => {
    console.log(user, 'ASSIGNED AGENT');
    const [agentData] = useState(user);
    const [userObj] = useState({
        img: agentData?.user?.data?.primary_agent?.profile_picture,
        name: agentData?.user?.data?.primary_agent?.last_name + ' ' + agentData?.user?.data?.primary_agent?.first_name,
    });
    const agentMenu = (
        <Menu className="border border-novelgray-60 rounded-[18px] shadow-20 w-[258px] h-[180px] p-3 space-y-3">
            <div className="mx-[12px]">
                <div className="flex items-start justify-between mb-[8px]">
                    <div className="mt-[1px]">
                        <ProfilePicture
                            name={
                                agentData?.user?.data?.primary_agent?.last_name +
                                ' ' +
                                agentData?.user?.data?.primary_agent?.first_name
                            }
                            imageUrl={userObj.img}
                            size={64}
                        />
                    </div>
                    <div className="bg-novelyellow-20 border border-novelyellow-30 px-2 py-0 rounded-full mt-[12px]">
                        <span className="text-novelyellow-40 font-bold text-xs">Agent</span>
                    </div>
                </div>
                <div className="bg-novelgray-50 rounded-xl p-3">
                    <Typography.Text className="text-base font-bold text-novelgray-40 mb-3 block">
                        {agentData?.user?.data?.primary_agent?.last_name}{' '}
                        {agentData?.user?.data?.primary_agent?.first_name}
                    </Typography.Text>
                    <div className="space-x-2 flex">
                        <a href={`tel:${agentData?.user?.data?.primary_agent?.phone}`}>
                            <div className="flex-1 bg-white shadow-50 rounded-lg py-2 flex justify-center items-center space-x-2 cursor-pointer px-1">
                                <span>{icons.phoneIcon()}</span>
                                <Typography.Text className="text-novelgray-40 text-sm">Call Agent</Typography.Text>
                            </div>
                        </a>

                        <a href={`mailto:${agentData?.user?.data?.primary_agent?.email}`}>
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

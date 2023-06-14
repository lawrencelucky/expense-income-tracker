import React from 'react';
import { Button, Dropdown, Typography, Menu } from 'antd';
import Image from 'next/image';
import icons from '@/icons';

const AssignAgentDropdown = () => {
    const agentMenu = (
        <Menu className="rounded-lg shadow w-[270px]">
            <div className="mx-[12px]">
                <div className="flex justify-between">
                    <div className="rounded-full shadow p-[20px] my-[10px]">
                        <Typography.Text>
                            <span className="text-[#3CCB7F]">GR</span>
                        </Typography.Text>
                    </div>
                    <div className="rounded-full bg-[#FAE2A8] w-[50px] h-[20px] text-center mt-[12px]">
                        <Typography.Text>
                            <span className="text-[10px] text-[#79350F] p-[2px] ">Agent</span>
                        </Typography.Text>
                    </div>
                </div>
                <div className="bg-[#FAFAF9] p-[10px] rounded-lg mb-[12px]">
                    <div className="flex flex-col mx-[4px]">
                        <div className="">
                            <Typography.Text>
                                <span className="text-[#3F3F46] font-bold text-[16px]">Gabar Rufus</span>
                            </Typography.Text>
                        </div>
                        <div className="flex justify-between mt-[12px]">
                            <div className="flex rounded-lg bg-white p-[8px]">
                                <span className="mt-1 mr-1">{icons.callIcon()}</span>
                                <Typography.Text>
                                    <span className="text-[#3F3F46]">Call Agent</span>
                                </Typography.Text>
                            </div>
                            <div className="flex rounded-lg bg-white p-[8px]">
                                <span className="mt-1 mr-1">{icons.emailIcon()}</span>
                                <Typography.Text>
                                    <span className="text-[#3F3F46]">Send email</span>
                                </Typography.Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Menu>
    );

    return (
        <Dropdown overlay={agentMenu}>
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

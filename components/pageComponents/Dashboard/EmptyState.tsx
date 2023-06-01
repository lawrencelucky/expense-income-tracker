import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const EmptyState = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[445px] h-[140px] rounded-[8px] shadow p-4 mt-[183px]">
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <Image src="/svgs/agentEmptyState.svg" alt="icon" width={30} height={30} />
                        <div className="rounded-full bg-[#DFE3FF]  left-28 top-1 w-[70px] h-[20px] text-center">
                            <Typography.Text>
                                <span className="text-[10px] text-[#121F87] p-[2px] ">In progress</span>
                            </Typography.Text>
                        </div>
                    </div>
                    <div className="mt-[27px] flex flex-col">
                        <Typography.Text>
                            <span className="font-medium text-[14px] text-[#26272B]">
                                Waiting to be assigned to an Agent
                            </span>
                        </Typography.Text>
                        <Typography.Text>
                            <span className="font-normal text-[12px] text-[#3F3F46]">
                                Check back in the next 24hours, we are assigning you an agent
                            </span>
                        </Typography.Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;

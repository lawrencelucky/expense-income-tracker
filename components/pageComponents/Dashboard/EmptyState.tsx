import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const EmptyState = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[445px] h-[140px] p-4 mt-[164px]">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <Image src="/svgs/noAgentEmptyState.svg" alt="icon" width={74} height={74} />
                            </div>
                            <div className="mt-[24px]">
                                <Image src="/svgs/loaderEmptyState.svg" alt="icon" width={218} height={74} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-[27px] flex flex-col">
                        <div className="flex justify-center mb-[12px]">
                            <Typography.Text>
                                <span className="font-bold text-[16px] text-[#26272B]">
                                    First, let’s assign you to an Agent
                                </span>
                            </Typography.Text>
                        </div>
                        <div className="flex justify-center">
                            <Typography.Text>
                                <span className="font-normal text-[14px] text-[#3F3F46]">
                                    Check back in the next 24hours, we are assigning you an agent
                                </span>
                            </Typography.Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;

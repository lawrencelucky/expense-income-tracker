import { Button, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const EmptyStateProfileWare = () => {
    return (
        <div className="flex justify-center items-center mb-[150px]">
            <div className="w-[445px] h-[140px] p-4 mt-[120px]">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <Image src="/svgs/profileEmptyState.svg" alt="icon" width={74} height={74} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-[27px] flex flex-col">
                        <div className="flex justify-center">
                            <Typography.Text>
                                <span className="font-medium text-[14px] text-[#26272B]">
                                    No warehouse added to your dashboard yet
                                </span>
                            </Typography.Text>
                        </div>
                        <div className="flex justify-center">
                            <Typography.Text>
                                <span className="font-normal text-[12px] text-[#3F3F46]">
                                    Contact support for informations regarding your farm
                                </span>
                            </Typography.Text>
                        </div>
                        <div className="flex justify-center">
                            <Button className="bg-[#12B76A] flex mt-2 border-0">
                                <Image
                                    src="/svgs/chatIcon.svg"
                                    alt="icon"
                                    width={13}
                                    height={13}
                                    className="mt-1 mr-1"
                                />
                                <Typography.Text>
                                    <span className="text-white">Contact Agent</span>
                                </Typography.Text>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyStateProfileWare;

import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import Select from '@/components/common/components/Select';
import { Avatar, Form, Progress, Typography } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';

interface IProps {
    openSettings: boolean;
    onCloseSettings: () => void;
}

const ProfileSettingsFormModal: React.FC<IProps> = ({ openSettings, onCloseSettings }) => {
    const [userInfoActive, setUserInfoActive] = useState(true);
    const [bankInfoActive, setBankInfoActive] = useState(false);

    const handleBankInfo = () => {
        setUserInfoActive(false);
        setBankInfoActive(true);
    };

    const handleUserInfo = () => {
        setUserInfoActive(true);
        setBankInfoActive(false);
    };

    return (
        <Modal
            open={openSettings}
            onClose={onCloseSettings}
            className="no-border !w-[622px]"
            okText="Submit"
            closable={false}
        >
            <div className="flex items-center justify-between mb-6">
                <Typography.Text className="font-bold text-base">Profile Settings</Typography.Text>
                <div className="bg-[#F8DCE3] py-[5px] px-[10px] rounded-[100px] space-x-1 flex items-center">
                    <Progress type="circle" percent={40} size={20} strokeColor={'#F04438'} trailColor="#ffffff" />
                    <Typography.Text className="text-sm font-medium">Verification Incomplete</Typography.Text>
                </div>
            </div>

            <div className="bg-novelgray-60 p-[6px] rounded-[100px] w-full flex mb-6">
                <div
                    onClick={handleUserInfo}
                    className={`${
                        userInfoActive && 'bg-white shadow-70'
                    } rounded-[100px] py-[6px] w-full cursor-pointer`}
                >
                    <Typography.Text
                        className={`${
                            userInfoActive ? 'text-novelblack-10' : 'text-novelgray-30'
                        } text-center block text-base font-bold`}
                    >
                        Identity Verification
                    </Typography.Text>
                </div>
                <div
                    onClick={handleBankInfo}
                    className={`${
                        bankInfoActive && 'bg-white shadow-70'
                    } rounded-[100px] py-[6px] w-full cursor-pointer `}
                >
                    <Typography.Text
                        className={`${
                            bankInfoActive ? 'text-novelblack-10' : 'text-novelgray-30'
                        } text-center block text-base font-bold`}
                    >
                        Facial Verification
                    </Typography.Text>
                </div>
            </div>

            {userInfoActive && (
                <Form className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Select Gender</Typography.Text>
                        <Select placeholder="Select Gender" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Date of Birth</Typography.Text>
                        <Input type="date" placeholder="" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Select State</Typography.Text>
                        <Select placeholder="Select State" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Identity Type</Typography.Text>
                        <Select placeholder="Identity Type" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">NIN Number</Typography.Text>
                        <Input type="text" placeholder="564748928974" className="w-[320px]" />
                    </div>
                </Form>
            )}

            {bankInfoActive && (
                <Form className="space-y-4">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center my-2">
                                <div className="flex flex-col">
                                    <Typography.Text>
                                        <span className="flex justify-center font-bold text-[16px] text-[#26272B]">
                                            Take a Photo
                                        </span>
                                    </Typography.Text>
                                    <Typography.Text>
                                        <span className="flex justify-center font-normal text-[14px] text-[#3F3F46]">
                                            Take a well-lit picture of your face, we need this to verify your identity
                                        </span>
                                    </Typography.Text>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <Image
                                    src="/svgs/imageEmptyProfileEdit.svg"
                                    alt="empty image icon"
                                    width={108}
                                    height={108}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Modal>
    );
};

export default ProfileSettingsFormModal;

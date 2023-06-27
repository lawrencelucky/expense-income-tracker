import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import Select from '@/components/common/components/Select';
import { Form, Progress, Typography } from 'antd';
import React, { useState } from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const AddBankModal: React.FC<IProps> = ({ open, onClose }) => {
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
        <Modal open={open} onClose={onClose} className="no-border !w-[622px]" okText="Save" closable={false}>
            <div className="flex items-center justify-between mb-6">
                <Typography.Text className="font-bold text-base">Setup Wallet</Typography.Text>
                <div className="bg-novelgreen-20 py-[5px] px-[10px] rounded-[100px] space-x-1 flex items-center">
                    <Progress type="circle" percent={40} size={20} strokeColor={'#12B76A'} trailColor="#ffffff" />
                    <Typography.Text className="text-sm font-medium">
                        Wallet is <span className="font-bold">40%</span> Complete
                    </Typography.Text>
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
                        User Info
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
                        Bank Info
                    </Typography.Text>
                </div>
            </div>

            {userInfoActive && (
                <Form className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">First Name</Typography.Text>
                        <Input type="text" placeholder="Enter first name" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Last Name</Typography.Text>
                        <Input type="text" placeholder="Enter last name" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Phone Number</Typography.Text>
                        <Input type="text" placeholder="090 300 0000" className="w-[320px]" />
                    </div>
                </Form>
            )}

            {bankInfoActive && (
                <Form className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Bank</Typography.Text>
                        <Select placeholder="Select Bank" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Account Number</Typography.Text>
                        <Input type="text" placeholder="Enter last name" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Account Name</Typography.Text>
                        <Input type="text" placeholder="Garba Felix" className="w-[320px]" />
                    </div>
                </Form>
            )}
        </Modal>
    );
};

export default AddBankModal;

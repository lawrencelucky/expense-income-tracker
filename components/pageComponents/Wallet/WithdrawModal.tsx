import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import { Typography } from 'antd';
import React from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const WithdrawModal: React.FC<IProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onCancel={onClose} title="Withdraw" className="!w-[622px]">
            <Typography.Text className="text-lg font-bold block">How much would you like to withdraw?</Typography.Text>
            <Typography.Text className="text-lg font-bold text-novelgray-30 block mb-8">
                Balance: <span className="text-novelgreen-10">₦540,000</span>
            </Typography.Text>

            <div className="flex justify-between items-center">
                <Typography.Text className="text-base">Amount</Typography.Text>
                <Input type="text" placeholder="Enter amount" className="w-[320px]" />
            </div>
        </Modal>
    );
};

export default WithdrawModal;

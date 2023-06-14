import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import { Typography } from 'antd';
import React, { useState } from 'react';
import WithdrawSavedAccountModal from './WithdrawSavedAccountModal';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const WithdrawModal: React.FC<IProps> = ({ open, onClose }) => {
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    return (
        <>
            <Modal
                open={open}
                onCancel={onClose}
                title="Withdraw"
                okText="Next"
                onOk={() => {
                    setOpenWithdrawModal(true);
                    onClose();
                }}
                className="!w-[622px]"
            >
                <Typography.Text className="text-lg font-bold block">
                    How much would you like to withdraw?
                </Typography.Text>
                <Typography.Text className="text-lg font-bold text-novelgray-30 block mb-8">
                    Balance: <span className="text-novelgreen-10">₦540,000</span>
                </Typography.Text>

                <div className="flex justify-between items-center">
                    <Typography.Text className="text-base">Amount</Typography.Text>
                    <Input type="text" placeholder="Enter amount" className="w-[320px]" />
                </div>
            </Modal>
            <WithdrawSavedAccountModal open={openWithdrawModal} onClose={() => setOpenWithdrawModal(false)} />
        </>
    );
};

export default WithdrawModal;

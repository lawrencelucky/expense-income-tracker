import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import WithdrawSavedAccountModal from './WithdrawSavedAccountModal';
import useUser from '@/hooks/useUser';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const WithdrawModal: React.FC<IProps> = ({ open, onClose }) => {
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const { data } = useUser();

    const walletData = data?.data.user.wallet;

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title="Withdraw"
                className="md:!w-[622px]"
                height={300}
                footer={
                    <div className="flex items-center justify-end space-x-4">
                        <Button onClick={onClose} className="novel-white-btn w-full md:w-fit">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setOpenWithdrawModal(true);
                                onClose();
                            }}
                            className="novel-btn md:w-fit"
                        >
                            Next
                        </Button>
                    </div>
                }
            >
                <Typography.Text className="text-lg font-bold block">
                    How much would you like to withdraw?
                </Typography.Text>
                <Typography.Text className="text-lg font-bold text-novelgray-30 block mb-4 lg:mb-8">
                    Balance: <span className="text-novelgreen-10">₦{walletData?.balance}</span>
                </Typography.Text>

                <div className="sm:flex justify-between items-center">
                    <Typography.Text className="text-base hidden lg:block">Amount</Typography.Text>
                    <Input type="text" placeholder="Enter amount" className="w-full lg:w-[320px]" />
                </div>
            </Modal>
            <WithdrawSavedAccountModal open={openWithdrawModal} onClose={() => setOpenWithdrawModal(false)} />
        </>
    );
};

export default WithdrawModal;

import Modal from '@/components/common/components/Modal';
import icons from '@/icons';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import VerifyOTPModal from './VerifyOTPModal';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<IProps> = ({ open, onClose }) => {
    const [openVerifyOTPModal, setOpenVerifyOTPModal] = useState(false);
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title="Confirm Amount"
                className="lg:!w-[622px]"
                height={600}
                footer={
                    <div className="flex items-center justify-end space-x-4">
                        <Button
                            onClick={() => {
                                setOpenVerifyOTPModal(true);
                                onClose();
                            }}
                            className="novel-btn md:w-fit"
                        >
                            Yes, Proceed
                        </Button>
                    </div>
                }
            >
                <div className="w-[74px] h-[74px] mb-8 rounded-[50%] bg-novelgreen-20 flex items-center justify-center">
                    <span>{icons.greenBankXLIcon()}</span>
                </div>
                <Typography.Text className="text-base md:text-lg font-bold block mb-2">
                    Garba Felix Onoja
                </Typography.Text>
                <Typography.Text className="text-base md:text-lg font-bold text-novelgray-30 block mb-8">
                    GUARANTY TRUST BANK • <span className="text-novelgray-40">54648872625</span>
                </Typography.Text>

                <div className="border-t border-b border-novelgray-20">
                    <div className="flex items-center justify-between py-3 border-b border-novelgray-20">
                        <Typography.Text className="text-base font-medium">Amount</Typography.Text>
                        <Typography.Text className="text-base font-medium">₦250,000</Typography.Text>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-novelgray-20">
                        <Typography.Text className="text-base font-medium">Amount</Typography.Text>
                        <Typography.Text className="text-base font-medium">₦250</Typography.Text>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-novelgray-20">
                        <Typography.Text className="text-base font-medium">Receiving Account</Typography.Text>
                        <Typography.Text className="text-base font-medium">54648872625</Typography.Text>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <Typography.Text className="text-base font-medium">Account Name</Typography.Text>
                        <Typography.Text className="text-base font-medium">Garba Felix Onoja</Typography.Text>
                    </div>
                </div>
            </Modal>

            <VerifyOTPModal open={openVerifyOTPModal} onClose={() => setOpenVerifyOTPModal(false)} />
        </>
    );
};

export default ConfirmModal;

import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import { Button, Form, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const VerifyOTPModal: React.FC<IProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onCancel={onClose} footer={null} closable={false} className="no-border !w-[368px]">
            <div className="px-4">
                <div className="flex flex-col items-center">
                    <div className="relative w-12 h-12 mb-5">
                        <Image src="/svgs/logo.svg" alt="novel logo" fill />
                    </div>

                    <Typography.Text className="text-lg font-bold block mb-[6px]">Enter the code</Typography.Text>

                    <Typography.Text className="text-novelblack-20 font-light block mb-6">
                        We&apos;ve sent an OTP to <span className="font-semibold">070*****838</span>
                    </Typography.Text>
                </div>

                <Form>
                    <Input placeholder="Enter code" type="text" />

                    <div className="flex flex-col">
                        <Typography.Text className="text-novelgray-30 block mt-6 text-center">
                            Didn&apos;t get the code?{' '}
                            <span
                                // onClick={resendOtp}
                                className="text-novelblack-10 cursor-pointer hover:text-novelgreen-10 transition ease-in duration-300"
                            >
                                Click to resend.
                            </span>
                        </Typography.Text>
                        {/* {loading && <Spin indicator={antIcon} />} */}
                    </div>
                </Form>
            </div>

            <div className="mt-6 px-4 pt-[18px]">
                <button className="novel-btn border-0">Submit</button>
            </div>
        </Modal>
    );
};

export default VerifyOTPModal;

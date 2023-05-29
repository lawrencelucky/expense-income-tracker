import Button from '@/components/common/components/Button';
import Input from '@/components/common/components/Input';
import helpers from '@/components/common/utils/helper';
import { Form, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const VerifyRegistrationForm = () => {
    return (
        <div className="bg-novelwhite py-8 px-4 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>

                <Typography.Text className="text-novelblack-20 block mb-6">
                    We&apos;ve sent an OTP to{' '}
                    <span className="font-medium">{helpers.hashPhoneNumber('07032443974')}</span>
                </Typography.Text>
            </div>

            <Form>
                <Input placeholder="Enter code" type="text" />

                <Typography.Text className="text-novelgray-30 block text-center">
                    Didn&apos;t get the code? <span className="text-novelgray-40 cursor-pointer">Click to resend.</span>
                </Typography.Text>

                <div className="mt-10">
                    <Button name="Verify" className="novel-btn" />
                </div>
            </Form>
        </div>
    );
};

export default VerifyRegistrationForm;

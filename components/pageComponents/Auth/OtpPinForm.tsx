import Button from '@/components/common/components/Button';
import OTPInput from '@/components/common/components/OTPInput';
import helpers from '@/components/common/utils/helper';
import auth from '@/config/services/auth';
import { Form, Typography } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import nookies from 'nookies';
import constants from '@config/constants';
import { useRouter } from 'next/router';
import logger from '@/logger.config';
import Link from 'next/link';

const { COOKIES, CLIENT_ROUTES } = constants;

const OtpPinForm = () => {
    const router = useRouter();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pin: '',
        },
        onSubmit: async ({ pin }) => {
            try {
                const payload = {
                    pin,
                };
                const response = await auth.enterPin(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                nookies.set(null, COOKIES.key, response.data, {
                    maxAge: COOKIES.maxAge,
                    path: COOKIES.path,
                });
                helpers.openNotification({ message: response.data, type: 'success' });
                return await router.push({
                    pathname: CLIENT_ROUTES.dashboard,
                });
            } catch (error) {
                return logger(error);
            }
        },
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit } = formik;
    return (
        <div className="bg-novelwhite py-8 px-4 w-[368px] border-novelgray-60 shadow-10 rounded-3xl loginInput">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>
                <Typography.Text className="font-bold text-lg block mb-1">Enter your pin</Typography.Text>
                <Typography.Text className="text-novelblack-20 block mb-6">
                    Enter your pin to access your dashboard
                </Typography.Text>
            </div>

            <Form>
                <OTPInput
                    autoFocus
                    isNumberInput
                    type="password"
                    length={4}
                    className="max-w-sm space-x-2 flex justify-center"
                    inputClassName={`w-[74px] h-[56px] border-2 rounded-[10px] border-[#E7E5E4] !bg-[#FFFFFF] ${
                        touched.pin && errors.pin && 'border-b-2 border-novelgreen-20'
                    } focus:outline-none focus:border-novelgreen-10 focus:border-b-4 text-center text-2xl font-semibold`}
                    onChangeOTP={(pin) => {
                        setFieldValue('pin', pin);
                    }}
                />
                <div className="mt-[32px] mb-[24px]">
                    <Typography.Text className="text-novelgray-30 block text-center">
                        Forgot pin?{' '}
                        <Link href={constants.CLIENT_ROUTES.auth.reset} className="!text-novelgray-40 cursor-pointer">
                            Click to reset.
                        </Link>
                    </Typography.Text>
                </div>
                <hr className="" />
                <div className="mt-[24px]">
                    <Button
                        name="Continue"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="novel-btn"
                        onClick={() => handleSubmit()}
                    />
                </div>
            </Form>
        </div>
    );
};

export default OtpPinForm;

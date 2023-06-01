import Button from '@/components/common/components/Button';
import OTPInput from '@/components/common/components/OTPInput';
import helpers from '@/components/common/utils/helper';
import constants from '@/config/constants';
import auth from '@/config/services/auth';
import { Form, Typography } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import logger from '@/logger.config';

const ConfirmResetPinForm = () => {
    const router = useRouter();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pin: '',
        },
        onSubmit: async ({ pin }, { setSubmitting }) => {
            const payload = {
                confirm_pin: router.query.pin,
                pin,
            };

            try {
                const response = await auth.confirmResetPin(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                helpers.openNotification({ message: response.message, type: 'success' });
                return await router.replace({
                    pathname: constants.CLIENT_ROUTES.auth.login,
                });
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit } = formik;

    return (
        <div className="bg-novelwhite py-8 px-4 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>
                <Typography.Text className="font-bold text-lg block mb-1">Confirm pin</Typography.Text>
                <Typography.Text className="text-novelblack-20 block mb-6">
                    Re-Enter your new pin to access your dashbaord
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

                <div className="mt-10">
                    <Button
                        name="Continue"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onClick={() => handleSubmit()}
                        className="novel-btn"
                    />
                </div>
            </Form>
        </div>
    );
};

export default ConfirmResetPinForm;

import Button from '@/components/common/components/Button';
import Input from '@/components/common/components/Input';
import { Form, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import auth from '@/config/services/auth';
import helpers from '@/components/common/utils/helper';
import constants from '@/config/constants';
import logger from '@/logger.config';
import schema from './validation';

const VerifyResetOtpForm = () => {
    const router = useRouter();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            otp: '',
        },
        onSubmit: async ({ otp }, { setSubmitting }) => {
            const payload = {
                otp,
            };

            try {
                const response = await auth.verifyResetOtp(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                helpers.openNotification({ message: 'Otp Verification is successful!', type: 'success' });
                return await router.replace({
                    pathname: constants.CLIENT_ROUTES.auth.setUpResetPin,
                });
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
        validationSchema: schema.resetOtp,
    });

    const { touched, errors, isSubmitting, handleSubmit, values, handleChange } = formik;

    return (
        <div className="bg-novelwhite py-8 px-4 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>

                <Typography.Text className="text-novelblack-20 block mb-6">
                    We&apos;ve sent an OTP to{' '}
                    <span className="font-medium">{helpers.hideDigits(router.query.phone)}</span>
                </Typography.Text>
            </div>

            <Form>
                <Input
                    placeholder="Enter code"
                    name={'otp'}
                    value={values.otp}
                    onChange={handleChange}
                    help={touched.otp && errors.otp}
                    type="text"
                    validateStatus={(touched.otp && errors.otp && 'error') || ''}
                    className="text-center"
                />

                <Typography.Text className="text-novelgray-30 block text-center">
                    Didn&apos;t get the code? <span className="text-novelgray-40 cursor-pointer">Click to resend.</span>
                </Typography.Text>

                <div className="mt-10">
                    <Button
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onClick={() => handleSubmit()}
                        name="Verify"
                        className="novel-btn"
                    />
                </div>
            </Form>
        </div>
    );
};

export default VerifyResetOtpForm;

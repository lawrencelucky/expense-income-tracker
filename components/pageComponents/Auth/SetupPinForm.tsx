import Button from '@/components/common/components/Button';
import OTPInput from '@/components/common/components/OTPInput';
import helpers from '@/components/common/utils/helper';
import constants from '@/config/constants';
import auth from '@/config/services/auth';
import { Form, Typography } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import logger from '@/logger.config';
import ConfirmPin from './ConfirmPin';

const SetupPinForm = () => {
    const router = useRouter();
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [showConfirmPin, setShowConfirmPin] = useState(false);
    const [showPinError, setShowPinError] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            confirm_pin: confirmPin,
            pin,
        },
        onSubmit: async ({ pin, confirm_pin }, { setSubmitting }) => {
            const payload = {
                confirm_pin,
                pin,
            };

            console.log(payload);

            try {
                const response = await auth.setPin(payload);
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

    const { touched, errors, isSubmitting, handleSubmit, setFieldValue, values } = formik;

    return (
        <>
            {!showConfirmPin ? (
                <div className="bg-novelwhite py-8 px-4 w-full h-screen sm:h-fit sm:w-[368px] flex flex-col justify-between border-novelgray-60 shadow-10 rounded-3xl loginInput">
                    <div className="px-4">
                        <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12 mb-5">
                                <Image src="/svgs/logo.svg" alt="novel logo" fill />
                            </div>

                            <Typography.Text className="text-lg font-bold block mb-[6px]">
                                Set up your pin
                            </Typography.Text>

                            <Typography.Text className="text-novelblack-20 block mb-6">
                                Create a pin to authenticate your account
                            </Typography.Text>
                        </div>

                        <Form>
                            <OTPInput
                                autoFocus
                                isNumberInput
                                type="password"
                                length={4}
                                className="max-w-sm space-x-2 flex justify-between"
                                inputClassName={`w-[74px] h-[56px] border rounded-[10px] border-[#E7E5E4] !bg-[#FFFFFF] ${
                                    touched.pin && errors.pin && 'border-1 border-novelgreen-10'
                                } focus:outline-none focus:border-novelgreen-10 focus:border-b-4 text-center text-2xl font-semibold`}
                                onChangeOTP={(pin) => {
                                    setFieldValue('pin', pin);
                                    setPin(pin);
                                    setShowPinError(false);
                                }}
                            />
                            {showPinError && (
                                <Typography.Text className="text-novelred-10 block mt-2 ml-2">
                                    Provide a 4 digit pin
                                </Typography.Text>
                            )}
                        </Form>
                    </div>
                    <div className="mt-6 pt-[18px] px-4 border-t border-novelgray-60">
                        <Button
                            name={'Continue'}
                            onClick={() => {
                                if (pin.length < 4) {
                                    setShowPinError(true);
                                    return;
                                }
                                setShowConfirmPin(true);
                            }}
                            className="novel-btn"
                        />
                    </div>
                </div>
            ) : (
                <ConfirmPin
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                    pin={pin}
                    setPin={setPin}
                    confirmPin={confirmPin}
                    setConfirmPin={setConfirmPin}
                    errors={errors}
                    touched={touched}
                    setShowConfirmPin={setShowConfirmPin}
                />
            )}
        </>
    );
};

export default SetupPinForm;

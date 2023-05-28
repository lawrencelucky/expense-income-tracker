import Button from '@/components/common/components/Button';
import OTPInput from '@/components/common/components/OTPInput';
import { Form, Typography } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';

const SetupPinForm = () => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            otp: '',
        },
        onSubmit: async ({ otp }, {}) => {},
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit } = formik;
    return (
        <div className="bg-novelwhite py-8 px-4 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>

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
                    className="max-w-sm space-x-2 flex justify-center"
                    inputClassName={`w-[74px] h-[56px] border-2 rounded-[10px] border-[#E7E5E4] !bg-[#FFFFFF] ${
                        touched.otp && errors.otp && 'border-b-2 border-novelgreen-20'
                    } focus:outline-none focus:border-novelgreen-10 focus:border-b-4 text-center text-2xl font-semibold`}
                    onChangeOTP={(otp) => {
                        setFieldValue('otp', otp);
                    }}
                />

                <div className="mt-10">
                    <Button name="Continue" className="novel-btn" />
                </div>
            </Form>
        </div>
    );
};

export default SetupPinForm;

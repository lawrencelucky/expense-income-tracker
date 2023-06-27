import Button from '@/components/common/components/Button';
import OTPInput from '@/components/common/components/OTPInput';
import { Form, Typography } from 'antd';
import { FormikErrors, FormikTouched } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

interface IProps {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) =>
        | Promise<void>
        | Promise<
              FormikErrors<{
                  confirm_pin: string;
                  pin: string;
              }>
          >;
    pin: string;
    setPin: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    isSubmitting: boolean;
    errors: FormikErrors<{
        confirm_pin: string;
        pin: string;
    }>;
    touched: FormikTouched<{
        confirm_pin: string;
        pin: string;
    }>;
    setShowConfirmPin: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmPin: React.Dispatch<React.SetStateAction<string>>;
    confirmPin: string;
}

const ConfirmPin: React.FC<IProps> = ({
    setFieldValue,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    confirmPin,
    setConfirmPin,
    pin,
    setPin,
    setShowConfirmPin,
}) => {
    const [showConfirmPinError, setShowConfirmPinError] = useState(false);

    return (
        <>
            <div className="bg-novelwhite py-8 px-4 w-full sm:w-[368px] h-screen sm:h-fit flex flex-col justify-between border-novelgray-60 shadow-10 rounded-3xl loginInput">
                <div className="px-4">
                    <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 mb-5">
                            <Image src="/svgs/logo.svg" alt="novel logo" fill />
                        </div>

                        <Typography.Text className="text-lg font-bold block mb-[6px]">Confirm pin</Typography.Text>

                        <Typography.Text className="text-novelblack-20 block mb-6">
                            Confirm your new pin
                        </Typography.Text>
                    </div>

                    <Form>
                        <OTPInput
                            autoFocus
                            isNumberInput
                            type="password"
                            length={4}
                            className="max-w-sm space-x-2 flex justify-center"
                            inputClassName={`w-[74px] h-[56px] border rounded-[10px] border-[#E7E5E4] !bg-[#FFFFFF] ${
                                touched.confirm_pin && errors.confirm_pin && 'border-1 border-novelred-10'
                            } focus:outline-none focus:border-novelgreen-10 focus:border-b-4 text-center text-2xl font-semibold`}
                            onChangeOTP={(confirmPin) => {
                                setFieldValue('confirm_pin', confirmPin);
                                setConfirmPin(confirmPin);
                                setShowConfirmPinError(false);
                            }}
                        />
                        {showConfirmPinError && (
                            <Typography.Text className="text-novelred-10 block mt-2 ml-2">
                                Pin does not match{' '}
                                <span
                                    onClick={() => {
                                        setPin('');
                                        setShowConfirmPin(false);
                                    }}
                                    className="text-novelblack-10 cursor-pointer hover:text-novelgreen-10 transition ease-in duration-300"
                                >
                                    Try again
                                </span>
                            </Typography.Text>
                        )}
                    </Form>
                </div>
                <div className="mt-6 pt-[18px] px-4 border-t border-novelgray-60">
                    <Button
                        name={'Verify'}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onClick={() => {
                            if (pin !== confirmPin) {
                                setShowConfirmPinError(true);
                                return;
                            }
                            handleSubmit();
                        }}
                        className="novel-btn"
                    />
                </div>
            </div>
        </>
    );
};

export default ConfirmPin;

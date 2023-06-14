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
import nookies from 'nookies';
import schema from './validation';

const { COOKIES, CLIENT_ROUTES } = constants;

const InitiateResetPinForm = () => {
    const router = useRouter();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            phone: '',
        },
        onSubmit: async ({ phone }, { setSubmitting }) => {
            const payload = {
                phone,
            };

            try {
                const response = await auth.forgotPin(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                nookies.set(null, COOKIES.key, response.token, {
                    maxAge: COOKIES.maxAge,
                    path: COOKIES.path,
                });
                helpers.openNotification({ message: response.message, type: 'success' });
                return await router.replace({
                    pathname: CLIENT_ROUTES.auth.verifyResetOtp,
                    query: { phone },
                });
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
        validationSchema: schema.initiatePhone,
    });

    const { touched, errors, isSubmitting, handleSubmit, values, handleChange } = formik;

    return (
        <div className="bg-novelwhite py-8 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>
                <Typography.Text className="font-bold text-lg block mb-1">Reset your pin</Typography.Text>
                <Typography.Text className="text-novelblack-20 block mb-6">
                    Enter your phone number to reset your pin
                </Typography.Text>
            </div>
            <div>
                <Form>
                    <div className="flex flex-col mt-[26px] mb-[24px] px-[30px]">
                        <label className="block font-medium mb-[6px]">Phone No. or email</label>
                        <Input
                            type="text"
                            name={'phone'}
                            value={values.phone}
                            onChange={handleChange}
                            help={touched.phone && errors.phone}
                            placeholder="+234 000 000 00"
                            validateStatus={(touched.phone && errors.phone && 'error') || ''}
                        />
                    </div>
                    <hr className="" />

                    <div className="mt-[18px] px-6">
                        <Button
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            onClick={() => handleSubmit()}
                            name="Continue"
                            className="novel-btn"
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default InitiateResetPinForm;

import React, { useEffect, useState } from 'react';
import { Form, Typography } from 'antd';
import Image from 'next/image';
import schema from './validation';
import { useFormik } from 'formik';
import auth from '@/services/auth';
import helpers from '@/common/utils/helper';
import constants from '@config/constants';
import { useRouter } from 'next/router';
import logger from '@logger';
import Input from '@/components/common/components/Input';
import Button from '@/components/common/components/Button';
import Link from 'next/link';
import nookies from 'nookies';

const { COOKIES, CLIENT_ROUTES } = constants;

const LoginInputForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [formState, setFormState] = useState<boolean>(false);

    // const handleClick = () => {
    //     setLoading(true);

    //     // Simulate an asynchronous action
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // };
    const formik = useFormik({
        initialValues: {
            login: '',
        },
        onSubmit: async ({ login }) => {
            try {
                // setLoading(true);
                const payload = {
                    login,
                };
                const response = await auth.login(payload);
                if (!response.success) {
                    // setLoading(false);
                    return helpers.openNotification({ message: response.data[0], type: 'error' });
                }
                nookies.set(null, COOKIES.key, response.token, {
                    maxAge: COOKIES.maxAge,
                    path: COOKIES.path,
                });
                helpers.openNotification({ message: response.data, type: 'success' });

                return await router.push({
                    pathname: CLIENT_ROUTES.otp,
                    query: { login },
                });
            } catch (error) {
                return logger(error);
            }
        },
        // validationSchema: schema.loginSchema,
    });
    const { handleChange, values, handleSubmit, isSubmitting, errors, touched } = formik;
    // useEffect(() => {
    //     console.log('Touched formik', handleChange);
    // }, [handleChange]);
    return (
        <div className="bg-novelwhite py-8 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>

                <Typography.Text className="font-bold text-lg block mb-1">Welcome Back!</Typography.Text>
                <Typography.Text className="text-novelblack-20 block mb-6">Sign in to your dashboard</Typography.Text>
            </div>
            <div>
                <Form>
                    <div className="flex flex-col mt-[32px] mb-[24px] px-[30px]">
                        <label className="block font-medium">Phone No. or email</label>
                        <Input
                            type="text"
                            name={'login'}
                            value={values.login}
                            onChange={handleChange}
                            help={touched.login && errors.login}
                            placeholder="Enter your phone no. or email"
                            validateStatus={(touched.login && errors.login && 'error') || ''}
                        />
                        {/* <input
                            id="loginInputData"
                            name="loginInputData"
                            type="text"
                            className="border-[1px] rounded-[8px] mt-[6px] border-[#E7E5E4] p-[4px] focus:outline-none focus:border-[#16B364] focus:shadow-focus-border"
                            onChange={handleChange}
                            value={values.loginInputData}
                        />{' '} */}
                    </div>
                    <hr className="" />
                    <div className="mt-[24px] mb-[14px] px-6">
                        <Button
                            name="Sign up"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="novel-btn"
                            onClick={() => handleSubmit()}
                        />
                    </div>
                    <span className="flex justify-center mt-[14px] mb-[14px] text-[#A0A0AB]">
                        Don’t have an account?{' '}
                        <Link href={constants.CLIENT_ROUTES.auth.register} className="!text-novelgray-40">
                            <span className="text-[#26272B]"> Sign up</span>
                        </Link>
                    </span>
                </Form>
            </div>
        </div>
    );
};

export default LoginInputForm;

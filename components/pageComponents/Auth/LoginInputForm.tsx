import React, { useEffect, useState } from 'react';
import { Form, Typography } from 'antd';
// import SigninButton from './SigninButton';
import { useFormik } from 'formik';
import auth from '@/services/auth';
import helpers from '@/common/utils/helper';
import constants from '@config/constants';
import { useRouter } from 'next/router';
import logger from '@logger';

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
            loginInputData: '',
        },
        onSubmit: async ({ loginInputData }) => {
            try {
                setLoading(true);
                const payload = {
                    loginInputData,
                };
                const response = await auth.login(payload);
                if (!response.success) {
                    setLoading(false);
                    return helpers.openNotification({ message: response.data[0], type: 'error' });
                } else {
                    setLoading(false);
                    helpers.openNotification({ message: response.data, type: 'success' });
                }
                return await router.push({
                    pathname: CLIENT_ROUTES.otp,
                    query: { loginInputData },
                });
            } catch (error) {
                return logger(error);
            }
        },
    });
    const { handleChange, values, handleSubmit, isSubmitting, errors, touched } = formik;
    useEffect(() => {
        console.log('Touched formik', handleChange);
    }, [handleChange]);
    return (
        <>
            <Form autoComplete="off" layout="vertical">
                <div className="flex flex-col mt-[32px] mb-[24px] px-[30px]">
                    <label htmlFor="email">Phone No. or email</label>
                    <input
                        id="loginInputData"
                        name="loginInputData"
                        type="text"
                        className="border-[1px] rounded-[8px] mt-[6px] border-[#E7E5E4] p-[4px] focus:outline-none focus:border-[#16B364] focus:shadow-focus-border"
                        onChange={handleChange}
                        value={values.loginInputData}
                    />{' '}
                </div>
                <hr className="w-[368px]" />
                <div className="flex justify-center mt-[24px] mb-[14px] ">
                    {/* <SigninButton
                        loading={loading}
                        formState={touched.loginInputData}
                        setFormState={setFormState}
                        // onClick={() => handleSubmit()}
                    >
                        {loading ? 'Signin in' : 'Sign in'}
                    </SigninButton> */}
                </div>
                <span className="flex justify-center mt-[14px] mb-[14px] text-[#A0A0AB]">
                    Don’t have an account? <span className="text-[#26272B]"> Sign up</span>
                </span>
            </Form>
        </>
    );
};

export default LoginInputForm;

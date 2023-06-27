import Button from '@/components/common/components/Button';
import Input from '@/components/common/components/Input';
import { Form, Spin, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import auth from '@/config/services/auth';
import helpers from '@/components/common/utils/helper';
import constants from '@/config/constants';
import logger from '@/logger.config';
import { LoadingOutlined } from '@ant-design/icons';

const VerifyRegistrationForm = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

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
                const response = await auth.verifyRegistration(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                helpers.openNotification({ message: 'Verification is successful!', type: 'success' });
                return await router.replace({
                    pathname: constants.CLIENT_ROUTES.auth.setPin,
                });
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const resendOtp = async () => {
        try {
            setLoading(true);
            const response = await auth.resendOtp();
            if (!response.success) {
                setLoading(false);
                return helpers.openNotification({ message: response.message, type: 'error' });
            }
            helpers.openNotification({ message: 'OTP generated successfully!', type: 'success' });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            return logger(error);
        }
    };

    const { touched, errors, isSubmitting, handleSubmit, values, handleChange } = formik;

    const antIcon = <LoadingOutlined style={{ color: '#16B364', fontSize: 16 }} spin rev={undefined} />;

    return (
        <div className="bg-novelwhite py-8 px-4 w-full h-screen sm:h-fit flex flex-col justify-between sm:w-[368px] border-novelgray-60 shadow-10 rounded-3xl loginInput">
            <div className="px-4">
                <div className="flex flex-col items-center">
                    <div className="relative w-12 h-12 mb-5">
                        <Image src="/svgs/logo.svg" alt="novel logo" fill />
                    </div>

                    <Typography.Text className="text-lg font-bold block mb-[6px]">Enter the code</Typography.Text>

                    <Typography.Text className="text-novelblack-20 font-light block mb-6">
                        We&apos;ve sent an OTP to <span className="font-semibold">{router.query.otp}</span>
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
                    />

                    <div className="flex flex-col">
                        <Typography.Text className="text-novelgray-30 block mt-6 text-center">
                            Didn&apos;t get the code?{' '}
                            <span
                                onClick={resendOtp}
                                className="text-novelblack-10 cursor-pointer hover:text-novelgreen-10 transition ease-in duration-300"
                            >
                                Click to resend.
                            </span>
                        </Typography.Text>
                        {loading && <Spin indicator={antIcon} />}
                    </div>
                </Form>
            </div>

            <div className="mt-6 px-4 border-t border-novelgray-60 pt-[18px]">
                <Button
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                    name="Verify"
                    className="novel-btn"
                />
            </div>
        </div>
    );
};

export default VerifyRegistrationForm;

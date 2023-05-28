import Button from '@/components/common/components/Button';
import Input from '@/components/common/components/Input';
import Select from '@/components/common/components/Select';
import helpers from '@/components/common/utils/helper';
import constants from '@/config/constants';
import { Form, Typography } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import auth from '@/config/services/auth';
import logger from '@/logger.config';
import useGetStates from '@/hooks/states/useGetStates';
import useGetLocalGovernment from '@/hooks/states/useGetLocalGovernment';
import useGetWard from '@/hooks/states/useGetWards';

const RegisterForm = () => {
    const router = useRouter();
    const [selectedState, setSelectedState] = useState<any>('');
    const [selectedLGA, setSelectedLGA] = useState<any>('');
    const { data: statesData } = useGetStates();
    const { data: localGovtData } = useGetLocalGovernment(selectedState);
    const { data: wardData } = useGetWard(selectedLGA);

    const states = useMemo(
        () =>
            statesData?.data?.states?.map(({ name, id }) => ({
                label: name,
                value: id,
            })),
        [statesData],
    );

    const localGovt = useMemo(
        () =>
            localGovtData?.data?.lgas?.map(({ name, id }) => ({
                label: name,
                value: id,
            })),
        [localGovtData],
    );

    const wards = useMemo(
        () =>
            wardData?.data?.wards?.map(({ name, id }) => ({
                label: name,
                value: id,
            })),
        [wardData],
    );

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            accept_terms: 1,
            email: '',
            first_name: '',
            last_name: '',
            local_government_id: '',
            phone: '',
            state_id: '',
            ward_id: '',
        },
        onSubmit: async (
            { accept_terms, first_name, email, last_name, local_government_id, phone, state_id, ward_id },
            { setSubmitting },
        ) => {
            const payload = {
                accept_terms,
                email,
                first_name,
                last_name,
                local_government_id,
                phone,
                state_id,
                ward_id,
            };

            console.log(payload);

            // try {
            //     const response = await auth.register(payload);
            //     if (!response.success) {
            //         return helpers.openNotification({ message: response.message, type: 'error' });
            //     }
            //     helpers.openNotification({ message: response.message, type: 'success' });
            //     return await router.replace({
            //         pathname: constants.CLIENT_ROUTES.auth.verifyRegistration,
            //         query: { otp: response.data.phone },
            //     });
            // } catch (error) {
            //     return logger(error);
            // } finally {
            //     setSubmitting(false);
            // }
        },
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit, values, handleChange } = formik;

    return (
        <div className="bg-novelwhite py-8 px-4 w-[368px] border-novelgray-60 shadow-10 rounded-3xl">
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 mb-5">
                    <Image src="/svgs/logo.svg" alt="novel logo" fill />
                </div>

                <Typography.Text className="font-bold text-lg block mb-1">Get Started</Typography.Text>
                <Typography.Text className="text-novelblack-20 block mb-6">Sign up to get started</Typography.Text>
            </div>
            <div>
                <Form>
                    <div>
                        <label className="block font-medium">
                            Phone number <sup className="text-novelgray-30">*</sup>
                        </label>
                        <Input
                            type="tel"
                            name={'phone'}
                            value={values.phone}
                            onChange={handleChange}
                            help={touched.phone && errors.phone}
                            placeholder="+234 000 0000 00"
                            validateStatus={(touched.phone && errors.phone && 'error') || ''}
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <Input
                            type="email"
                            name={'email'}
                            value={values.email}
                            onChange={handleChange}
                            help={touched.email && errors.email}
                            placeholder="Enter your email"
                            validateStatus={(touched.email && errors.email && 'error') || ''}
                        />
                    </div>

                    <div>
                        <label className="block font-medium">
                            First name <sup className="text-novelgray-30">*</sup>
                        </label>
                        <Input
                            type="text"
                            name={'first_name'}
                            value={values.first_name}
                            onChange={handleChange}
                            help={touched.first_name && errors.first_name}
                            placeholder="First name"
                            validateStatus={(touched.first_name && errors.first_name && 'error') || ''}
                        />
                    </div>

                    <div>
                        <label className="block font-medium">
                            Last name <sup className="text-novelgray-30">*</sup>
                        </label>
                        <Input
                            type="text"
                            name={'last_name'}
                            value={values.last_name}
                            onChange={handleChange}
                            help={touched.last_name && errors.last_name}
                            placeholder="Last name"
                            validateStatus={(touched.last_name && errors.last_name && 'error') || ''}
                        />
                    </div>

                    <div className="flex space-x-3">
                        <div className="w-full">
                            <label className="block font-medium mb-1">
                                State <sup className="text-novelgray-30">*</sup>
                            </label>
                            <Select
                                onChange={(val) => {
                                    setSelectedState(val);
                                    setFieldValue('state_id', val);
                                }}
                                placeholder="Select state"
                                help={touched.state_id && errors.state_id}
                                validateStatus={(touched.state_id && errors.state_id && 'error') || ''}
                                options={states}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block font-medium mb-1">
                                LGA <sup className="text-novelgray-30">*</sup>
                            </label>
                            <Select
                                onChange={(val) => {
                                    setSelectedLGA(val);
                                    setFieldValue('local_government_id', val);
                                }}
                                placeholder="Select LGA"
                                help={touched.local_government_id && errors.local_government_id}
                                validateStatus={
                                    (touched.local_government_id && errors.local_government_id && 'error') || ''
                                }
                                options={localGovt}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Ward</label>
                        <Select
                            onChange={(val) => setFieldValue('ward_id', val)}
                            placeholder="Select ward"
                            help={touched.ward_id && errors.ward_id}
                            validateStatus={(touched.ward_id && errors.ward_id && 'error') || ''}
                            options={wards}
                        />
                    </div>

                    <div>
                        <Button
                            name="Sign up"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="novel-btn"
                            onClick={() => handleSubmit()}
                        />
                    </div>
                </Form>

                <div className="mt-4">
                    <Typography.Text className="text-novelgray-30 text-sm block mb-4 text-center">
                        By signing up, you agree to our{' '}
                        <span className="text-novelgray-40 underline">Terms of Service & Privacy policy</span>
                    </Typography.Text>

                    <Typography.Text className="text-novelgray-30 text-sm block text-center">
                        Already have an account?{' '}
                        <Link href={constants.CLIENT_ROUTES.auth.login} className="!text-novelgray-40">
                            Sign in
                        </Link>
                    </Typography.Text>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;

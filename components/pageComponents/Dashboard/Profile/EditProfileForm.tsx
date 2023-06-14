/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useMemo } from 'react';
import { Form, Modal, Typography, Select } from 'antd';
import Input from '@/components/common/components/Input';
import { useFormik } from 'formik';
import useGetLocalGovernment from '@/hooks/states/useGetLocalGovernment';
import useGetWard from '@/hooks/states/useGetWards';

const EditProfileModal: React.FC<{ isOpen: boolean; onOk: () => void; onCancel: () => void }> = ({
    isOpen,
    onOk,
    onCancel,
}) => {
    const [selectedLGA, setSelectedLGA] = useState<any>('');
    const { data: wardData } = useGetWard(selectedLGA);
    // const { data: localGovtData } = useGetLocalGovernment(selectedState);
    // const localGovt = useMemo(
    //     () =>
    //         localGovtData?.data?.lgas?.map(({ name, id }) => ({
    //             label: name,
    //             value: id,
    //         })),
    //     [localGovtData],
    // );

    // const wards = useMemo(
    //     () =>
    //         wardData?.data?.wards?.map(({ name, id }) => ({
    //             label: name,
    //             value: id,
    //         })),
    //     [wardData],
    // );
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

            // try {
            //     const response = await auth.register(payload);
            //     if (!response.success) {
            //         return helpers.openNotification({ message: response.data[0], type: 'error' });
            //     }
            //     helpers.openNotification({ message: response.message, type: 'success' });

            //     nookies.set(null, constants.COOKIES.key, response.token, {
            //         maxAge: constants.COOKIES.maxAge,
            //         path: constants.COOKIES.path,
            //     });

            // return await router.replace({
            //     pathname: constants.CLIENT_ROUTES.auth.verifyRegistration,
            //     query: { otp: response.data.phone },
            // });
            // } catch (error) {
            // return logger(error);
            // } finally {
            //    setSubmitting(false);
            //}
        },
        // validationSchema: schema.registerSchema,
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit, values, handleChange } = formik;

    return (
        <div className="w-[546px] h-[752px]">
            {' '}
            <Modal title="Edit Profile" visible={isOpen} onOk={onOk} onCancel={onCancel}>
                <hr />
                <div className="flex flex-col my-5">
                    <Typography.Text className="font-bold text-lg block mb-1 mt-1">Get Started</Typography.Text>
                    <Typography.Text className="text-novelblack-20 block mb-6">Sign up to get started</Typography.Text>

                    <Form>
                        <div className="mt-2">
                            {/* <label className="block font-medium mb-[6px]">
                                First name <sup className="text-novelgray-30">*</sup>
                            </label> */}
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
                        <div className="mt-2">
                            {/* <label className="block font-medium mb-[6px]">
                                First name <sup className="text-novelgray-30">*</sup>
                            </label> */}
                            <Input
                                type="text"
                                name={'first_name'}
                                value={values.last_name}
                                onChange={handleChange}
                                help={touched.last_name && errors.last_name}
                                placeholder="Last name"
                                validateStatus={(touched.last_name && errors.last_name && 'error') || ''}
                            />
                        </div>
                        <div className="mt-2">
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
                        <div className="mt-2">
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
                        {/* <div className="w-full mt-2">
                            <label className="block font-medium mb-[6px]">
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
                        </div> */}
                    </Form>
                </div>
                <hr />
            </Modal>
        </div>
    );
};

export default EditProfileModal;

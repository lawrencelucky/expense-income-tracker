import Input from '@/components/common/components/Input';
import Select from '@/components/common/components/Select';
import Modal from '@/components/common/components/Modal';
import { Avatar, Form, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import logger from '@/logger.config';
import useGetStates from '@/hooks/states/useGetStates';
import useGetLocalGovernment from '@/hooks/states/useGetLocalGovernment';
import useGetWard from '@/hooks/states/useGetWards';
import user from '@/config/services/user';
import helpers from '@/components/common/utils/helper';

interface IProps {
    openEdit: boolean;
    onCloseEdit: () => void;
}

const EditProfileFormModal: React.FC<IProps> = ({ openEdit, onCloseEdit }) => {
    const [selectedState, setSelectedState] = useState<any>('');
    const [selectedLGA, setSelectedLGA] = useState<any>('');
    const { data: statesData } = useGetStates();
    const { data: localGovtData } = useGetLocalGovernment(selectedState);
    const { data: wardData } = useGetWard(selectedLGA);
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

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
            email: '',
            first_name: '',
            last_name: '',
            local_government_id: '',
            phone: '',
            state_id: '',
            ward_id: '',
        },
        onSubmit: async (
            { first_name, email, last_name, local_government_id, phone, state_id, ward_id },
            { setSubmitting },
        ) => {
            const payload = {
                email,
                first_name,
                last_name,
                local_government_id,
                phone,
                state_id,
                ward_id,
            };
            console.log(payload);
            try {
                const response = await user.editProfile(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                helpers.openNotification({ message: response.message, type: 'success' });
                setOpenEditProfileModal(false);
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
        // validationSchema: schema.registerSchema,
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit, values, handleChange } = formik;

    return (
        <Modal
            open={openEdit}
            onClose={onCloseEdit}
            title="Edit Profile"
            className="!w-[564px]"
            onOk={() => handleSubmit()}
        >
            <div className="flex flex-col">
                <Typography.Text>
                    <span className="font-bold text-base">Profile Photo</span>
                </Typography.Text>
                <Typography.Text>
                    <span className="font-normal text-sm">Change display picture</span>
                </Typography.Text>
                <div className="flex py-5">
                    <div className="mr-4">
                        <Avatar size={100} src="/svgs/userAvatar.svg" />
                    </div>
                    <div className="">
                        <Image src="/svgs/imageEmptyProfileEdit.svg" alt="empty image icon" width={108} height={108} />
                    </div>
                </div>
                <div>
                    <Form className="space-y-[14px]">
                        <Input
                            type="text"
                            name={'first_name'}
                            value={values.first_name}
                            onChange={handleChange}
                            help={touched.first_name && errors.first_name}
                            placeholder="First name"
                            validateStatus={(touched.first_name && errors.first_name && 'error') || ''}
                        />
                        <Input
                            type="text"
                            name={'last_name'}
                            value={values.last_name}
                            onChange={handleChange}
                            help={touched.last_name && errors.last_name}
                            placeholder="Last name"
                            validateStatus={(touched.last_name && errors.last_name && 'error') || ''}
                        />
                        <Input
                            type="email"
                            name={'email'}
                            value={values.email}
                            onChange={handleChange}
                            help={touched.email && errors.email}
                            placeholder="Enter your email"
                            validateStatus={(touched.email && errors.email && 'error') || ''}
                        />
                        <Input
                            type="tel"
                            name={'phone'}
                            value={values.phone}
                            onChange={handleChange}
                            help={touched.phone && errors.phone}
                            placeholder="+234 000 0000 00"
                            validateStatus={(touched.phone && errors.phone && 'error') || ''}
                        />

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
                        <Select
                            onChange={(val) => setFieldValue('ward_id', val)}
                            placeholder="Select ward"
                            help={touched.ward_id && errors.ward_id}
                            validateStatus={(touched.ward_id && errors.ward_id && 'error') || ''}
                            options={wards}
                        />
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileFormModal;

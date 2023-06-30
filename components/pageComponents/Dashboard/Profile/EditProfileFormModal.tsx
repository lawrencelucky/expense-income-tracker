import Input from '@/components/common/components/Input';
import Select from '@/components/common/components/Select';
import Modal from '@/components/common/components/Modal';
import { Avatar, Form, Typography, Progress } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import logger from '@/logger.config';
import useGetStates from '@/hooks/states/useGetStates';
import useGetLocalGovernment from '@/hooks/states/useGetLocalGovernment';
import useGetWard from '@/hooks/states/useGetWards';
import user from '@/config/services/user';
import helpers from '@/components/common/utils/helper';
import { create } from 'zustand';
import TextAreaInput from '@/components/common/components/Input/TextAreaInput';

interface IProps {
    openEdit: boolean;
    onCloseEdit: () => void;
}
interface UserData {
    data?: any;
}

interface Store {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
}

const useStore = create<Store>((set) => ({
    setUserData: (data) => set(() => ({ userData: data })),

    userData: null,
}));

const EditProfileFormModal: React.FC<IProps> = ({ openEdit, onCloseEdit }) => {
    const [selectedState, setSelectedState] = useState<any>('');
    const { userData, setUserData } = useStore();
    const [selectedLGA, setSelectedLGA] = useState<any>('');
    const { data: statesData } = useGetStates();
    const { data: localGovtData } = useGetLocalGovernment(selectedState);
    const { data: wardData } = useGetWard(selectedLGA);
    const [profileActive, setProfileActive] = useState(true);
    const [identityActive, setIdentityActive] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: UserData = await user.getDetails();
                setUserData(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    console.log(userData, 'userdata');
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
                // setOpenEditProfileModal(false);
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
        // validationSchema: schema.registerSchema,
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit, values, handleChange } = formik;
    const handleIdentityActive = () => {
        setProfileActive(false);
        setIdentityActive(true);
    };

    const handleProfileActive = () => {
        setProfileActive(true);
        setIdentityActive(false);
    };

    return (
        <Modal
            open={openEdit}
            onCancel={onCloseEdit}
            title="Edit Profile"
            className="!w-[637px]"
            onOk={() => handleSubmit()}
        >
            {/* imported from settings modal */}
            {identityActive && (
                <div className="flex justify-end mb-6">
                    <div className="bg-[#F8DCE3] py-[5px] px-[10px] rounded-[100px] space-x-1 flex items-center">
                        <Progress type="circle" percent={40} size={20} strokeColor={'#F04438'} trailColor="#ffffff" />
                        <Typography.Text className="text-sm font-medium">Verification Incomplete</Typography.Text>
                    </div>
                </div>
            )}
            {/* imported from settings modal */}

            {/* imported from settings modal the tab component */}
            <div className="bg-novelgray-60 p-[6px] rounded-[100px] w-full flex mb-6">
                <div
                    onClick={handleProfileActive}
                    className={`${
                        profileActive && 'bg-white shadow-70'
                    } rounded-[100px] py-[6px] w-full cursor-pointer`}
                >
                    <Typography.Text
                        className={`${
                            profileActive ? 'text-novelblack-10' : 'text-novelgray-30'
                        } text-center block text-base font-bold`}
                    >
                        Profile
                    </Typography.Text>
                </div>
                <div
                    onClick={handleIdentityActive}
                    className={`${
                        identityActive && 'bg-white shadow-70'
                    } rounded-[100px] py-[6px] w-full cursor-pointer `}
                >
                    <Typography.Text
                        className={`${
                            identityActive ? 'text-novelblack-10' : 'text-novelgray-30'
                        } text-center block text-base font-bold`}
                    >
                        Identity Verification
                    </Typography.Text>
                </div>
            </div>
            {/* imported from settings modal the tab component */}

            {profileActive && (
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
                            <Image
                                src="/svgs/imageEmptyProfileEdit.svg"
                                alt="empty image icon"
                                width={108}
                                height={108}
                            />
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
                                placeholder={userData?.data?.first_name}
                                validateStatus={(touched.first_name && errors.first_name && 'error') || ''}
                            />
                            <Input
                                type="text"
                                name={'last_name'}
                                value={values.last_name}
                                onChange={handleChange}
                                help={touched.last_name && errors.last_name}
                                placeholder={userData?.data?.last_name}
                                validateStatus={(touched.last_name && errors.last_name && 'error') || ''}
                            />
                            <Input
                                type="email"
                                name={'email'}
                                value={values.email}
                                onChange={handleChange}
                                help={touched.email && errors.email}
                                placeholder={userData?.data?.email}
                                validateStatus={(touched.email && errors.email && 'error') || ''}
                            />
                            <Input
                                type="tel"
                                name={'phone'}
                                value={values.phone}
                                onChange={handleChange}
                                help={touched.phone && errors.phone}
                                placeholder={userData?.data?.phone}
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
            )}
            {identityActive && (
                <Form className="space-y-4">
                    <div className="w-full rounded-lg flex space-x-3 bg-[#fafaf9] justify-center items-center py-3 cursor-pointer">
                        <Image src="/svgs/AddpictureEditModal.svg" alt="Add picture Icon" width={64} height={64} />
                        <div className="flex justify-center">
                            <div className="flex flex-col space-y-1">
                                <Typography.Text>
                                    <span className="flex font-bold text-[16px] text-[#26272B]">Take a Photo</span>
                                </Typography.Text>
                                <Typography.Text>
                                    <span className="flex  font-normal text-[14px] text-[#3F3F46]">
                                        Take a well-lit picture of your face, we need this to verify your identity
                                    </span>
                                </Typography.Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Select Gender</Typography.Text>
                        <Select placeholder="Select Gender" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Date of Birth</Typography.Text>
                        <Input type="date" placeholder="" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Residential Address</Typography.Text>
                        <TextAreaInput type="text" placeholder="" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Identity Type</Typography.Text>
                        <Select placeholder="Identity Type" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">NIN Number</Typography.Text>
                        <Input type="text" placeholder="564748928974" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">BVN</Typography.Text>
                        <Input type="text" placeholder="Enter BVN" className="w-[320px]" />
                    </div>
                </Form>
            )}
        </Modal>
    );
};

export default EditProfileFormModal;

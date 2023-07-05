import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import Select from '@/components/common/components/Select';
import helpers from '@/components/common/utils/helper';
import banks from '@/config/services/banks';
import useGetBanks from '@/hooks/banks/useGetBanks';
import useUser from '@/hooks/useUser';
import logger from '@/logger.config';
import { Button, Form, Progress, Typography } from 'antd';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const AddBankModal: React.FC<IProps> = ({ open, onClose }) => {
    const [userInfoActive, setUserInfoActive] = useState(true);
    const [bankInfoActive, setBankInfoActive] = useState(false);
    const { data } = useGetBanks();
    const { data: userData } = useUser();

    const banksOptions = useMemo(
        () =>
            data?.data.banks?.map(({ name, code }) => ({
                label: name,
                value: code,
            })),
        [data],
    );

    const handleBankInfo = () => {
        setUserInfoActive(false);
        setBankInfoActive(true);
    };

    const handleUserInfo = () => {
        setUserInfoActive(true);
        setBankInfoActive(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            bank_code: null,
            name: '',
            number: '',
        },
        onSubmit: async ({ bank_code, name, number }, { setSubmitting }) => {
            const payload = { bank_code, name, number };

            try {
                const response = await banks.createBankAccount(payload);
                if (!response.success) {
                    return helpers.openNotification({ message: response.message, type: 'error' });
                }
                helpers.openNotification({ message: response.message, type: 'success' });
                onClose();
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit, values, handleChange } = formik;

    return (
        <Modal
            open={open}
            onClose={onClose}
            className="no-border md:!w-[622px]"
            closable={false}
            height={400}
            footer={
                <div className="flex items-center justify-end space-x-4">
                    <Button onClick={onClose} className="novel-white-btn w-full md:w-fit">
                        Cancel
                    </Button>
                    <Button
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onClick={() => handleSubmit()}
                        className="novel-btn md:w-fit"
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <div className="flex items-center justify-between mb-6">
                <Typography.Text className="font-bold text-base">Setup Wallet</Typography.Text>
                <div className="bg-novelgreen-20 py-[5px] px-[10px] rounded-[100px] space-x-1 flex items-center">
                    <Progress type="circle" percent={40} size={20} strokeColor={'#12B76A'} trailColor="#ffffff" />
                    <Typography.Text className="text-sm font-medium">
                        Wallet is <span className="font-bold">40%</span> Complete
                    </Typography.Text>
                </div>
            </div>

            <div className="bg-novelgray-60 p-[6px] rounded-[100px] w-full flex mb-6">
                <div
                    onClick={handleUserInfo}
                    className={`${
                        userInfoActive && 'bg-white shadow-70'
                    } rounded-[100px] py-[6px] w-full cursor-pointer`}
                >
                    <Typography.Text
                        className={`${
                            userInfoActive ? 'text-novelblack-10' : 'text-novelgray-30'
                        } text-center block text-base font-bold`}
                    >
                        User Info
                    </Typography.Text>
                </div>
                <div
                    onClick={handleBankInfo}
                    className={`${
                        bankInfoActive && 'bg-white shadow-70'
                    } rounded-[100px] py-[6px] w-full cursor-pointer `}
                >
                    <Typography.Text
                        className={`${
                            bankInfoActive ? 'text-novelblack-10' : 'text-novelgray-30'
                        } text-center block text-base font-bold`}
                    >
                        Bank Info
                    </Typography.Text>
                </div>
            </div>

            {userInfoActive && (
                <Form className="space-y-4">
                    <div className="md:flex justify-between items-center">
                        <Typography.Text className="text-base hidden md:block">First Name</Typography.Text>
                        <Input
                            type="text"
                            placeholder="First name"
                            value={userData?.data.user.first_name}
                            className="md:w-[320px]"
                        />
                    </div>
                    <div className="md:flex justify-between items-center">
                        <Typography.Text className="text-base hidden md:block">Last Name</Typography.Text>
                        <Input
                            type="text"
                            placeholder="Last name"
                            value={userData?.data.user.last_name}
                            className="md:w-[320px]"
                        />
                    </div>
                    <div className="md:flex justify-between items-center">
                        <Typography.Text className="text-base hidden md:block">Phone Number</Typography.Text>
                        <Input
                            type="text"
                            placeholder="090 300 0000"
                            value={userData?.data.user.phone}
                            className="md:w-[320px]"
                        />
                    </div>
                </Form>
            )}

            {bankInfoActive && (
                <Form className="space-y-4">
                    <div className="md:flex justify-between items-center">
                        <Typography.Text className="text-base hidden md:block">Bank</Typography.Text>
                        <Select
                            placeholder="Select Bank"
                            className="md:!w-[320px]"
                            onChange={(val) => {
                                setFieldValue('bank_code', val);
                            }}
                            options={banksOptions}
                            help={touched.bank_code && errors.bank_code}
                            validateStatus={(touched.bank_code && errors.bank_code && 'error') || ''}
                            value={values.bank_code}
                        />
                    </div>
                    <div className="md:flex justify-between items-center">
                        <Typography.Text className="text-base hidden md:block">Account Number</Typography.Text>
                        <Input
                            type="text"
                            placeholder="Account Number"
                            name={'number'}
                            value={values.number}
                            onChange={handleChange}
                            className="md:w-[320px]"
                            help={touched.number && errors.number}
                            validateStatus={(touched.number && errors.number && 'error') || ''}
                        />
                    </div>
                    <div className="md:flex justify-between items-center">
                        <Typography.Text className="text-base hidden md:block">Account Name</Typography.Text>
                        <Input
                            type="text"
                            placeholder="Account Name"
                            name={'name'}
                            value={values.name}
                            onChange={handleChange}
                            className="md:w-[320px]"
                            help={touched.name && errors.name}
                            validateStatus={(touched.name && errors.name && 'error') || ''}
                        />
                    </div>
                </Form>
            )}
        </Modal>
    );
};

export default AddBankModal;

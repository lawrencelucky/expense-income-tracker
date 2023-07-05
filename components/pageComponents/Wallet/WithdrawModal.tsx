import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import { Button, Dropdown, Form, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import useUser from '@/hooks/useUser';
import Select from '@/components/common/components/Select';
import useGetBankAccoutns from '@/hooks/banks/useGetBankAccounts';
import icons from '@/icons';
import { useFormik } from 'formik';
import logger from '@/logger.config';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const WithdrawModal: React.FC<IProps> = ({ open, onClose }) => {
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const { data } = useUser();
    const { data: bankAccounts } = useGetBankAccoutns();
    const [selectedBank, setSelectedBank] = useState({
        account_name: '',
        account_number: '',
        banks: {
            data: [
                {
                    code: 0,
                    id: 0,
                    name: '',
                },
            ],
        },
        created_at: new Date(),
        id: 0,
        is_active: '',
        is_primary: '',
        updated_at: new Date(),
    });

    const walletData = data?.data?.user?.wallet;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            amount: '',
        },
        onSubmit: async ({ amount }, { setSubmitting, resetForm }) => {
            const payload = { amount };

            try {
                // const response = await banks.createBankAccount(payload);
                // if (!response.success) {
                //     return helpers.openNotification({ message: response.message, type: 'error' });
                // }
                // helpers.openNotification({ message: response.message, type: 'success' });
                // resetForm();
                // mutate();
                // setUserInfoActive(true);
                // setBankInfoActive(false);
                onClose();
            } catch (error) {
                return logger(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const { touched, errors, setFieldValue, isSubmitting, handleSubmit, values, handleChange } = formik;

    const menu = (
        <>
            {bankAccounts?.data?.bank_accounts?.length ? (
                <Menu className="lg:!p-3 space-y-1">
                    {bankAccounts?.data?.bank_accounts?.map((bank, idx) => (
                        <Menu.Item key={idx} className="!px-3 !py-2 !rounded-md" onClick={() => setSelectedBank(bank)}>
                            <div className="flex items-center justify-between">
                                <Typography.Text className="text-sm font-medium space-x-3">
                                    <span>
                                        {bank.account_name} - {bank.account_number}
                                    </span>
                                    {bank.is_primary === '1' && (
                                        <span className="text-novelblue-40 bg-novelblue-50 py-[2px] px-[10px] rounded-[100px]">
                                            Primary
                                        </span>
                                    )}
                                </Typography.Text>
                            </div>
                        </Menu.Item>
                    ))}
                </Menu>
            ) : (
                <Menu className="lg:!p-3 space-y-1">
                    <Menu.Item>There are currently no saved accounts</Menu.Item>
                </Menu>
            )}
        </>
    );

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title="Withdraw"
                className="md:!w-[622px]"
                height={300}
                footer={
                    <div className="flex items-center justify-end space-x-4">
                        <Button
                            onClick={() => {
                                if (step2) {
                                    setStep2(false);
                                    setStep1(true);
                                } else if (step3) {
                                    setStep2(true);
                                    setStep3(false);
                                } else {
                                    onClose();
                                }
                            }}
                            className="novel-white-btn w-full md:w-fit"
                        >
                            {step1 ? 'Cancel' : step2 ? 'Previous' : step3 ? 'Previous' : 'Cancel'}
                        </Button>
                        <Button
                            onClick={() => {
                                if (step1) {
                                    setStep2(true);
                                    setStep1(false);
                                } else if (step2) {
                                    setStep2(false);
                                    setStep3(true);
                                }
                            }}
                            className="novel-btn md:w-fit"
                        >
                            Next
                        </Button>
                    </div>
                }
            >
                {step1 && (
                    <>
                        <Typography.Text className="text-lg font-bold block">
                            How much would you like to withdraw?
                        </Typography.Text>
                        <Typography.Text className="text-lg font-bold text-novelgray-30 block mb-4 lg:mb-8">
                            Balance: <span className="text-novelgreen-10">₦{walletData?.balance}</span>
                        </Typography.Text>

                        <div className="sm:flex justify-between items-center">
                            <Typography.Text className="text-base hidden lg:block">Amount</Typography.Text>
                            <Input
                                type="text"
                                value={values.amount}
                                name={'amount'}
                                onChange={handleChange}
                                placeholder="Enter amount"
                                className="w-full lg:w-[320px]"
                            />
                        </div>
                    </>
                )}

                {step2 && (
                    <>
                        <Dropdown overlay={menu} trigger={['click']} className="cursor-pointer mb-6">
                            <div className="flex items-center justify-between py-2 px-2 bg-novelgray-60 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <span>{icons.starIcon()}</span>
                                    <div>
                                        <Typography.Text className="text-base font-bold block">
                                            Saved Account
                                        </Typography.Text>
                                        <Typography.Text className="text-sm text-novelgray-70">
                                            Send to already saved account
                                        </Typography.Text>
                                    </div>
                                </div>

                                <span>{icons.greenArrowDown()}</span>
                            </div>
                        </Dropdown>

                        <Form className="space-y-4">
                            <div className="md:flex justify-between items-center">
                                <Typography.Text className="text-base hidden md:block">Bank Name</Typography.Text>
                                <Input
                                    placeholder="Bank Name"
                                    value={selectedBank.banks.data[0].name}
                                    className="md:!w-[320px]"
                                />
                            </div>
                            <div className="md:flex justify-between items-center">
                                <Typography.Text className="text-base hidden md:block">Account Number</Typography.Text>
                                <Input
                                    type="text"
                                    placeholder="Account number"
                                    value={selectedBank.account_number}
                                    className="md:w-[320px]"
                                />
                            </div>

                            <div className="md:flex justify-between items-center">
                                <Typography.Text className="text-base hidden md:block">Account Name</Typography.Text>
                                <Input
                                    type="text"
                                    placeholder="Garba Felix"
                                    value={selectedBank.account_name}
                                    disabled
                                    className="md:w-[320px]"
                                />
                            </div>
                        </Form>
                    </>
                )}

                {step3 && (
                    <>
                        <div className="w-[74px] h-[74px] mb-8 rounded-[50%] bg-novelgreen-20 flex items-center justify-center">
                            <span>{icons.greenBankXLIcon()}</span>
                        </div>
                        <Typography.Text className="text-base md:text-lg font-bold block mb-2">
                            {selectedBank.account_name}
                        </Typography.Text>
                        <Typography.Text className="text-base md:text-lg font-bold text-novelgray-30 block mb-8">
                            {selectedBank.banks.data.map((bank) => bank.name)} •{' '}
                            <span className="text-novelgray-40">{selectedBank.account_number}</span>
                        </Typography.Text>

                        <div className="border-t border-b border-novelgray-20">
                            <div className="flex items-center justify-between py-3 border-b border-novelgray-20">
                                <Typography.Text className="text-base font-medium">Amount</Typography.Text>
                                <Typography.Text className="text-base font-medium">₦{values.amount}</Typography.Text>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-novelgray-20">
                                <Typography.Text className="text-base font-medium">Processing Fee</Typography.Text>
                                <Typography.Text className="text-base font-medium">₦0</Typography.Text>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-novelgray-20">
                                <Typography.Text className="text-base font-medium">Receiving Account</Typography.Text>
                                <Typography.Text className="text-base font-medium">
                                    {selectedBank.account_number}
                                </Typography.Text>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <Typography.Text className="text-base font-medium">Account Name</Typography.Text>
                                <Typography.Text className="text-base font-medium">
                                    {selectedBank.account_name}
                                </Typography.Text>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default WithdrawModal;

import Input from '@/components/common/components/Input';
import Modal from '@/components/common/components/Modal';
import Select from '@/components/common/components/Select';
import icons from '@/icons';
import { Dropdown, Form, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const WithdrawSavedAccountModal: React.FC<IProps> = ({ open, onClose }) => {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const menu = (
        <Menu className="!p-3 space-y-1">
            <Menu.Item className="!px-3 !py-2 !rounded-md">
                <div className="flex items-center justify-between">
                    <Typography.Text className="text-sm font-medium space-x-3">
                        <span>Felix Garba Onaja - Access Bank</span>
                        <span className="text-novelblue-40 bg-novelblue-50 py-[2px] px-[10px] rounded-[100px]">
                            Primary
                        </span>
                    </Typography.Text>
                    <span>{icons.doneIcon()}</span>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="flex items-center justify-between">
                    <Typography.Text className="text-sm font-medium space-x-3">
                        <span>Felix Garba Onaja - Guranty Trust Bank</span>
                    </Typography.Text>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Modal
                open={open}
                onCancel={onClose}
                onOk={() => {
                    setOpenConfirmModal(true);
                    onClose();
                }}
                okText="Proceed"
                title="Withdraw"
                className="!w-[622px]"
            >
                <Dropdown overlay={menu} trigger={['click']} className="cursor-pointer mb-6">
                    <div className="flex items-center justify-between py-2 px-2 bg-novelgray-60 rounded-xl">
                        <div className="flex items-center space-x-3">
                            <span>{icons.starIcon()}</span>
                            <div>
                                <Typography.Text className="text-base font-bold block">Saved Account</Typography.Text>
                                <Typography.Text className="text-sm text-novelgray-70">
                                    Send to already saved account
                                </Typography.Text>
                            </div>
                        </div>

                        <span>{icons.greenArrowDown()}</span>
                    </div>
                </Dropdown>

                <Form className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Receiver</Typography.Text>
                        <Select placeholder="Third Party" className="!w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Account Number</Typography.Text>
                        <Input type="text" placeholder="Enter account number" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Bank Name</Typography.Text>
                        <Input type="text" placeholder="GTBank" className="w-[320px]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography.Text className="text-base">Account Name</Typography.Text>
                        <Input type="text" placeholder="Garba Felix" className="w-[320px]" />
                    </div>
                </Form>
            </Modal>

            <ConfirmModal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)} />
        </>
    );
};

export default WithdrawSavedAccountModal;

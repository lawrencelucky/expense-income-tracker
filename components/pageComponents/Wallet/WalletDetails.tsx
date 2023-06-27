import React, { useState } from 'react';
import icons from '@/icons';
import { Dropdown, Menu, Typography } from 'antd';
import AddBankModal from './AddBankModal';
import WithdrawModal from './WithdrawModal';
import DeleteModal from './DeleteModal';
import WalletChart from './WalletChart';

const WalletDetails = () => {
    const [hasBank, setHasBank] = useState(false);
    const [openAddBankModal, setOpenAddBankModal] = useState(false);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const balanceMenu = (
        <Menu className="w-[207px] shadow-60 left-[-170px] !p-3 !rounded-[14px] space-y-1">
            <Menu.Item className="!rounded-xl !py-2 !px-3" onClick={() => setOpenWithdrawModal(true)}>
                <div className="flex justify-between items-center">
                    <Typography.Text className="text-sm font-medium">Withdraw Money</Typography.Text>
                    <span>{icons.greenWalletIcon()}</span>
                </div>
            </Menu.Item>

            <Menu.Item className="!rounded-xl !py-2 !px-3 ">
                <div className="flex justify-between items-center">
                    <Typography.Text className="text-sm font-medium">Show Balance</Typography.Text>
                    <span>{icons.eyeIcon()}</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    const bankMenu = (
        <Menu className="w-[259px] shadow-60 left-[15px] lg:left-[-220px] !p-3 !rounded-[14px] space-y-3">
            <Menu.Item className="!p-0" onClick={() => setOpenAddBankModal(true)}>
                <div className="flex justify-center items-center space-x-2 border border-novelgray-20 py-1.5 rounded-lg">
                    <span>{icons.plusIcon()}</span>
                    <Typography.Text className="text-sm font-medium">Add Bank</Typography.Text>
                </div>
            </Menu.Item>

            <Menu.Item className="!p-0 hover:!bg-transparent">
                {hasBank ? (
                    <div className="flex justify-center items-center space-x-2">
                        <span>{icons.bankIcon()}</span>
                        <Typography.Text className="text-sm text-novelgray-30 font-medium">
                            No bank added
                        </Typography.Text>
                    </div>
                ) : (
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-novelgray-60 px-3 py-2 rounded-lg">
                            <span>{icons.greenBankIcon()}</span>
                            <Typography.Text className="text-xs">
                                Garba Felix - <span className="font-bold">3023 ***</span>
                            </Typography.Text>
                        </div>
                        <span className="cursor-pointer" onClick={() => setOpenDeleteModal(true)}>
                            {icons.deleteIcon()}
                        </span>
                    </div>
                )}
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex space-x-6 overflow-x-scroll no-scrollbar ">
            <div className="lg:hidden whitespace-nowrap inline-block">
                <WalletChart />
            </div>
            <div className="hidden lg:block border border-novelgray-60 shadow-20 py-3 px-6 flex-1 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <Typography.Text className="text-sm text-novelgray-40 font-medium">Balance</Typography.Text>
                    <Dropdown overlay={balanceMenu} trigger={['click']}>
                        <span className="cursor-pointer">{icons.moreIcon()}</span>
                    </Dropdown>
                </div>

                <Typography.Text className="text-base font-bold text-novelblack-10">₦0.00</Typography.Text>
            </div>
            <div className="border border-novelgray-60 shadow-20 py-3 px-6 flex flex-col lg:flex-1 justify-between rounded-xl w-[300px] lg:h-fit lg:w-full whitespace-nowrap">
                <div className="flex justify-between items-center mb-6">
                    <Typography.Text className="text-sm text-novelgray-40 font-medium">Bank</Typography.Text>
                    <Dropdown overlay={bankMenu} trigger={['click']}>
                        <span className="cursor-pointer">{icons.moreIcon()}</span>
                    </Dropdown>
                </div>

                {!hasBank ? (
                    <div className="flex justify-between w-[220px] items-center">
                        <Typography.Text className="text-novelgray-30 text-base font-bold">
                            No bank added
                        </Typography.Text>
                        <button className="novel-white-btn" onClick={() => setOpenAddBankModal(true)}>
                            Setup wallet
                        </button>
                    </div>
                ) : (
                    <Typography.Text className="text-base w-[220px] font-bold text-novelblack-10">
                        Garba Felix - <span className="text-novelgray-70">3023 **** ****</span>
                    </Typography.Text>
                )}
            </div>

            <AddBankModal open={openAddBankModal} onClose={() => setOpenAddBankModal(false)} />
            <WithdrawModal open={openWithdrawModal} onClose={() => setOpenWithdrawModal(false)} />
            <DeleteModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />
        </div>
    );
};

export default WalletDetails;

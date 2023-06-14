import React, { useState } from 'react';
import { Typography, Table as AntdTable } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import icons from '@/icons';
import Button from '@/components/common/components/Button';
import Image from 'next/image';
import WithdrawSavedAccountModal from './WithdrawSavedAccountModal';

interface DataType {
    bank: string;
    date: string;
    recepient: string;
    transactionId: string;
    status: string;
    type: string;
    key: string;
}

const WalletTransactionTable = () => {
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [hasTransaction, setHasTransaction] = useState(false);

    const data: DataType[] = [
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '1',
            recepient: 'Self',
            status: 'Successful',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '2',
            recepient: 'Self',
            status: 'Pending',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '3',
            recepient: 'Self',
            status: 'Failed',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '4',
            recepient: 'Self',
            status: 'Active',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '5',
            recepient: 'Self',
            status: 'Pending',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '6',
            recepient: 'Self',
            status: 'Failed',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
        {
            bank: 'GT Bank',
            date: '10/06/22',
            key: '7',
            recepient: 'Self',
            status: 'Active',
            transactionId: '10928089U9',
            type: 'Withdrawal',
        },
    ];

    const columns: ColumnsType<DataType> = [
        {
            dataIndex: 'recepient',
            key: 'recepient',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
            title: 'Recipient',
        },
        {
            dataIndex: 'bank',
            key: 'bank',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
            title: 'Bank',
        },
        {
            dataIndex: 'transactionId',
            key: 'transactionId',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
            title: 'Transaction ID',
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
            title: 'Date',
        },
        {
            dataIndex: 'type',
            key: 'type',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
            title: 'Type',
        },
        {
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Typography.Text
                    className={`${
                        text === 'Successful'
                            ? 'bg-novelgreen-30'
                            : text === 'Failed'
                            ? 'bg-novelred-20'
                            : 'bg-novelyellow-10'
                    } px-2 py-1 rounded-full`}
                >
                    {text}
                </Typography.Text>
            ),
            title: 'Status',
        },
        {
            dataIndex: 'action',
            key: 'action',
            render: (text) => <Typography.Text className="cursor-pointer">{icons.eyeIcon()}</Typography.Text>,
            title: 'Action',
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <Typography.Text className="text-lg font-bold block">Transactions</Typography.Text>
                <div className="flex items-center space-x-3">
                    {hasTransaction && (
                        <div className="flex items-center space-x-2 border border-novelgray-60 py-2 px-3 rounded-lg shadow-30 cursor-pointer">
                            <Typography.Text className="text-novelgray-70 text-sm">This week</Typography.Text>
                            <span>{icons.caretDown()}</span>
                        </div>
                    )}
                    <Button onClick={() => setOpenWithdrawModal(true)} name="Withdraw" className="novel-btn w-fit" />
                </div>
            </div>
            {hasTransaction ? (
                <AntdTable
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    className="border border-novelgray-60 rounded-2xl overflow-hidden"
                />
            ) : (
                <div className="bg-novelgray-50 h-[50vh] rounded-[14px] flex flex-col items-center justify-center">
                    <div className="relative w-[74px] h-[74px] mb-5">
                        <Image src="/svgs/transaction-empty-state.svg" alt="empty" fill />
                    </div>
                    <Typography.Text className="text-base font-bold">No transaction log yet</Typography.Text>
                    <Typography.Text className="text-novelgray-40 text-sm block mt-3">
                        Set up wallet to start a transaction
                    </Typography.Text>
                </div>
            )}
            <WithdrawSavedAccountModal open={openWithdrawModal} onClose={() => setOpenWithdrawModal(false)} />
        </div>
    );
};

export default WalletTransactionTable;

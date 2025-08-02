/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, Table as AntdTable } from 'antd';
import icons from '@/icons';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import helpers from '@/components/common/utils/helper';

interface DataType {
    amount: string;
    type: string;
    description: string;
    date: string;
}

const Transactions = (props) => {
    const data: DataType[] = props.transactions;

    const columns: ColumnsType<DataType> = [
        {
            dataIndex: 'sn',
            key: 'sn',
            render: (_, __, index) => <Typography.Text className="text-[#6B7280] text-sm">{index + 1}</Typography.Text>,
            title: 'S/N',
            width: 50,
        },
        {
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => (
                <Typography.Text>
                    {helpers.formatNumber({
                        currency: 'NGN',
                        isCurrency: true,
                        notation: 'standard',
                        number: text,
                    })}
                </Typography.Text>
            ),
            title: 'Amount',
            width: 120,
        },
        {
            dataIndex: 'type',
            key: 'type',
            render: (text) => (
                <Typography.Text
                    className={`${
                        text === 'income' ? 'bg-[#D8F7C7]' : 'bg-[#F8DCE3]'
                    } px-2 py-1 rounded-full capitalize`}
                >
                    {text}
                </Typography.Text>
            ),
            title: 'Transaction Type',
            width: 100,
        },
        {
            dataIndex: 'description',
            key: 'description',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
            title: 'Description',
            width: 250,
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: (text) => <Typography.Text>{moment(text).format('MMM Do, YYYY')}</Typography.Text>,
            title: 'Transaction Date',
            width: 150,
        },
        {
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <div className="space-x-4 flex">
                    <span onClick={() => props.handleDelete(record)} className="cursor-pointer">
                        {icons.deleteIcon()}
                    </span>
                </div>
            ),
            title: 'Action',
            width: 100,
        },
    ];

    return (
        <div className="mt-[64px]">
            <Typography className="text-lg block mb-5">Transcations</Typography>
            <div className="rounded-2xl overflow-hidden no-scrollbar">
                <AntdTable
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    className="no-scrollbar"
                />
            </div>
        </div>
    );
};

export default Transactions;

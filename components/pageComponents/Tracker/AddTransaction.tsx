/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Transaction from './TransactionModel';
import Select from '@/components/common/components/Select';
import Input from '@/components/common/components/Input';
import Button from '@/components/common/components/Button';
import { DatePicker, DatePickerProps, Drawer, Typography } from 'antd';
import helpers from '@/components/common/utils/helper';
import CustomDatePicker from '@/components/common/components/Input/CustomDatePicker';

const AddTransaction = (props) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('income');
    const [transactionDate, setTransactionDate] = useState(Date.now());

    const handleTransactionType = (value) => {
        setTransactionType(value);
    };

    const submitTransaction = (evt) => {
        evt.preventDefault();

        if (amount === '' && description === '') {
            helpers.openNotification({
                message: 'Please fill in all fields',
                type: 'error',
            });
            return;
        }

        const trans = new Transaction(transactionType, amount, description, transactionDate);

        if (transactionType === 'expense') {
            const newBalance = props.previousBalance - Number(amount);
            props.setBalance(newBalance);

            const stringifiedBalance = JSON.stringify(newBalance);
            localStorage.setItem('balance', stringifiedBalance);

            const newExpenseTotal = props.totalExpense + Number(amount);
            props.setTotalExpense(newExpenseTotal);
            localStorage.setItem('totalExpense', JSON.stringify(newExpenseTotal));
        } else if (transactionType === 'income') {
            const newBalance = props.previousBalance + Number(amount);
            props.setBalance(newBalance);

            const stringifiedBalance = JSON.stringify(newBalance);
            localStorage.setItem('balance', stringifiedBalance);

            const newIncomeTotal = props.totalIncome + Number(amount);
            props.setTotalIncome(newIncomeTotal);
            localStorage.setItem('totalIncome', JSON.stringify(newIncomeTotal));
        }

        const updatedTransactions = [...props.currentTransaction, trans];
        props.addTransactionFn(updatedTransactions);

        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        props.handleClose();
        setDescription('');
        setAmount('');
        setTransactionDate(Date.now());
        setTransactionType('income');
        helpers.openNotification({
            message: 'Transaction added successfully',
            type: 'success',
        });
    };

    const onChange: DatePickerProps['onChange'] = (date) => {
        setTransactionDate(date?.valueOf() ?? Date.now());
    };

    return (
        <Drawer
            width={450}
            open={props.openAddTransaction}
            onClose={props.handleClose}
            title="Add Transaction"
            closeIcon={null}
            footer={
                <div className="flex gap-x-3">
                    <Button
                        name="Cancel"
                        onClick={props.handleClose}
                        className="w-full bg-transparent text-novelblack-10 hover:!text-novelblack-10 border-novelblack-10 hover:!border-novelblack-10 h-[50px]"
                    />
                    <Button
                        name="Add Transaction"
                        onClick={submitTransaction}
                        className="w-full bg-novelgreen-10 text-white hover:!text-white border-0 h-[50px]"
                    />
                </div>
            }
        >
            <div className="px-5 mt-10">
                <form onSubmit={submitTransaction}>
                    <Typography className="text-novelblack-10 font-semibold mb-1">Transaction type</Typography>
                    <Select
                        options={[
                            { label: 'Income', value: 'income' },
                            { label: 'Expense', value: 'expense' },
                        ]}
                        onChange={handleTransactionType}
                        className="w-full !mb-[32px]"
                    />

                    <Typography className="text-novelblack-10 font-semibold mb-1">Amount</Typography>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="!w-full !mb-[32px]"
                    />

                    <Typography className="text-novelblack-10 font-semibold mb-1">Transaction description</Typography>
                    <Input
                        onChange={(event) => setDescription(event.target.value)}
                        type="text"
                        value={description}
                        className="!w-full !mb-[32px]"
                    />

                    <Typography className="text-novelblack-10 font-semibold mb-1">Transaction date</Typography>
                    <CustomDatePicker onChange={onChange} className="w-full" />
                </form>
            </div>
        </Drawer>
    );
};

export default AddTransaction;

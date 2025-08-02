import React, { useEffect, useState } from 'react';
import PageHead from '@/components/common/components/PageHead';
import MainLayout from '@/components/layouts/MainLayout';
import Balance from '@/components/pageComponents/Tracker/Balance';
import AddTransaction from '@/components/pageComponents/Tracker/AddTransaction';
import Transactions from '@/components/pageComponents/Tracker/Transactions';
import { Typography } from 'antd';
import icons from '@/icons';
import helpers from '@/components/common/utils/helper';

type Transaction = {
    id: string | number;
    amount: number;
    type: 'income' | 'expense';
    // add other properties if needed
};

export default function TransactionsPage() {
    const [balance, setBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [openAddTransaction, setOpenAddTransaction] = useState(false);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions') ?? '[]') as Transaction[];
        const storedBalance = JSON.parse(localStorage.getItem('balance') ?? '0');

        if (storedTransactions) {
            setTransactions(storedTransactions);

            const income = storedTransactions
                .filter((tx) => tx.type === 'income')
                .reduce((sum, tx) => sum + Number(tx.amount), 0);
            const expense = storedTransactions
                .filter((tx) => tx.type === 'expense')
                .reduce((sum, tx) => sum + Number(tx.amount), 0);

            setTotalIncome(income);
            setTotalExpense(expense);
        }

        if (storedBalance) {
            setBalance(storedBalance);
        }
    }, []);

    const handleDelete = (transaction) => {
        const newTransactions = transactions.filter((trans) => trans.id !== transaction.id);

        if (transaction.type === 'income') {
            setBalance(balance - transaction.amount);
            const stringifiedBalance = JSON.stringify(balance - transaction.amount);
            localStorage.setItem('balance', stringifiedBalance);
        } else if (transaction.type === 'expense') {
            setBalance(balance + Number(transaction.amount));
            const stringifiedBalance = JSON.stringify(balance + Number(transaction.amount));
            localStorage.setItem('balance', stringifiedBalance);
        }

        const stringifiedTransactions = JSON.stringify(newTransactions);

        localStorage.setItem('transactions', stringifiedTransactions);
        setTransactions(newTransactions);
    };

    return (
        <MainLayout
            title="Transactions"
            hasButton
            btnText="Add Transaction"
            handleClick={() => setOpenAddTransaction(true)}
        >
            <PageHead title="Transactions" />
            <div className="grid grid-cols-3 gap-8">
                <div className="shadow-30 rounded-lg bg-white h-[95px]">
                    <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                        <Typography.Text className="text-[#A0A0AB] text-sm">Available Balance</Typography.Text>
                        <span>{icons.moreIcon()}</span>
                    </div>
                    <div className="px-6 py-1 space-y-1">
                        <Typography.Text className="text-lg">
                            {helpers.formatNumber({
                                currency: 'NGN',
                                isCurrency: true,
                                notation: 'standard',
                                number: balance,
                            })}
                        </Typography.Text>
                        <div className="flex justify-end">
                            {/* <Typography.Text>Recurring Revenue</Typography.Text> */}
                            {balance == 0 ? (
                                <span>{icons.progressIcon()}</span>
                            ) : (
                                <span>{icons.progressIconGreen()}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="shadow-30 rounded-lg bg-white h-[95px]">
                    <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                        <Typography.Text className="text-[#A0A0AB] text-sm">Total Income</Typography.Text>
                        <span>{icons.moreIcon()}</span>
                    </div>
                    <div className="px-6 py-1 space-y-1">
                        <Typography.Text className="text-lg">
                            {helpers.formatNumber({
                                currency: 'NGN',
                                isCurrency: true,
                                notation: 'standard',
                                number: totalIncome,
                            })}
                        </Typography.Text>
                        <div className="flex justify-end">
                            {/* <Typography.Text>Recurring Revenue</Typography.Text> */}
                            {totalIncome == 0 ? (
                                <span>{icons.progressIcon()}</span>
                            ) : (
                                <span>{icons.progressIconGreen()}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="shadow-30 rounded-lg bg-white h-[95px]">
                    <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                        <Typography.Text className="text-[#A0A0AB] text-sm">Total Expense</Typography.Text>
                        <span>{icons.moreIcon()}</span>
                    </div>
                    <div className="px-6 py-1 space-y-1">
                        <Typography.Text className="text-lg">
                            {helpers.formatNumber({
                                currency: 'NGN',
                                isCurrency: true,
                                notation: 'standard',
                                number: totalExpense,
                            })}
                        </Typography.Text>
                        <div className="flex justify-end">
                            {/* <Typography.Text>Recurring Revenue</Typography.Text> */}
                            {totalExpense == 0 ? (
                                <span>{icons.progressIcon()}</span>
                            ) : (
                                <span>{icons.progressIconGreen()}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AddTransaction
                currentTransaction={transactions}
                addTransactionFn={setTransactions}
                setBalance={setBalance}
                previousBalance={balance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                setTotalIncome={setTotalIncome}
                setTotalExpense={setTotalExpense}
                openAddTransaction={openAddTransaction}
                handleClose={() => setOpenAddTransaction(false)}
            />

            <Transactions handleDelete={handleDelete} transactions={transactions} />
        </MainLayout>
    );
}

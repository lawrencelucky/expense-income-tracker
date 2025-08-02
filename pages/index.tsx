import React, { useEffect, useState } from 'react';
import PageHead from '@/components/common/components/PageHead';
import MainLayout from '@/components/layouts/MainLayout';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions') ?? '');

        if (storedTransactions) {
            setTransactions(storedTransactions);
        }
    }, []);

    const processData = (data) => {
        const months = Array(12)
            .fill(0)
            .map(() => ({ expense: 0, income: 0 }));

        data.forEach((item) => {
            const date = new Date(item.date);
            const monthIndex = date.getMonth(); // Get month (0 = January, 11 = December)
            const amount = parseInt(item.amount, 10); // Convert amount to number

            if (item.type === 'income') {
                months[monthIndex].income += amount;
            } else if (item.type === 'expense') {
                months[monthIndex].expense += amount;
            }
        });

        return {
            datasets: [
                {
                    backgroundColor: '#75d05e',
                    data: months.map((month) => month.income),
                    label: 'Income',
                },
                {
                    backgroundColor: '#f24e1e',
                    data: months.map((month) => month.expense),
                    label: 'Expense',
                },
            ],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        };
    };

    const chartData = processData(transactions);

    return (
        <MainLayout title="Dashboard">
            <PageHead title="Dashboard" />
            <div className="flex items-center justify-center w-full">
                <div className="w-[80vw] h-[70vh]">
                    <Bar
                        data={chartData}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: 'Monthly Income and Expense',
                                },
                            },
                            responsive: true,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Months',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Amount',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </MainLayout>
    );
}

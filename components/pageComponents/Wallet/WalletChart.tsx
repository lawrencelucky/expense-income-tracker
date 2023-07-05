import React from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Typography } from 'antd';
import { useWindowSize } from '@/hooks/useWindowSize';
import Select from '@/components/common/components/Select';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataPoint {
    x: string;
    y: number;
}

const generateAreaChartData = (length: number): DataPoint[] => {
    const data: DataPoint[] = [];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - length);
    for (let i = 0; i < length; i++) {
        const date = new Date(startDate.getFullYear(), startDate.getMonth() + i);
        const month = date.toLocaleString('default', { month: 'short' });
        data.push({
            x: month,
            y: Math.floor(Math.random() * 100),
        });
    }
    return data;
};
const WalletChart = () => {
    const chartData = generateAreaChartData(10);
    const { width } = useWindowSize();

    const options: ApexOptions = {
        chart: {
            animations: {
                dynamicAnimation: {
                    speed: 1000,
                },
                easing: 'linear',
                enabled: true,
            },
            height: width > 600 ? 350 : 150,
            toolbar: {
                show: false,
            },
            type: 'line',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: ['#D8F7C7'],
        },
        grid: {
            padding: {
                left: 15,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        stroke: {
            colors: ['#12B76A'],
            curve: 'smooth',
            width: 2,
        },
        tooltip: {
            marker: {
                fillColors: ['#12B76A'],
                show: false,
            },
            style: {
                fontSize: '12px',
            },
            theme: 'light',
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            categories: chartData.map((data) => data.x),
            labels: {
                style: {
                    colors: '#757588',
                    fontFamily: 'satoshi',
                    fontSize: '12px',
                },
            },
            offsetY: 8,
            tickAmount: 20,
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
    };

    return (
        <div className="border border-novelgray-60 rounded-[14px] shadow-20 w-[300px] lg:w-full">
            <div className="py-3 px-4 flex justify-between space-x-2 border-b border-novelgray-60">
                <div>
                    <Typography.Text className="text-sm text-novelgray-40 font-medium block mb-2">
                        Earnings
                    </Typography.Text>
                    <Typography.Text className="text-base font-bold text-novelblack-10">₦0</Typography.Text>
                </div>
                <Select
                    defaultValue="30days"
                    className="!w-[120px]"
                    options={[
                        { label: '7 Days', value: '7days' },
                        { label: '30 Days', value: '30days' },
                        { label: '90 Days', value: '90days' },
                    ]}
                ></Select>
            </div>
            <ApexChart
                options={options}
                series={[
                    {
                        data: [0, 0, 0, 0, 0, 0],
                        name: 'Amount',
                    },
                ]}
                type="area"
            />
        </div>
    );
};

export default WalletChart;

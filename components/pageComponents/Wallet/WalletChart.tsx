import React from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Typography } from 'antd';
import icons from '@/icons';
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

    const options: ApexOptions = {
        chart: {
            animations: {
                dynamicAnimation: {
                    speed: 1000,
                },
                easing: 'linear',
                enabled: true,
            },
            height: 350,
            toolbar: {
                show: false,
            },
            type: 'area',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: ['#EFFAF6'],
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
        <div className="border border-novelgray-60 rounded-[14px] shadow-20">
            <div className="py-3 px-4 flex justify-between space-x-2 border-b border-novelgray-60">
                <div>
                    <Typography.Text className="text-sm text-novelgray-40 font-medium block mb-2">
                        Earnings
                    </Typography.Text>
                    <Typography.Text className="text-base font-bold text-novelblack-10">₦2,345,265.00</Typography.Text>
                </div>
                <div className="flex items-center space-x-2 border border-novelgray-60 py-2 px-3 rounded-lg cursor-pointer">
                    <Typography.Text className="text-novelgray-70 text-sm">Last 30 days</Typography.Text>
                    <span>{icons.caretDown()}</span>
                </div>
            </div>
            <ApexChart
                options={options}
                series={[
                    {
                        data: chartData,
                        name: 'Series 1',
                    },
                ]}
                type="area"
                width="100%"
                height={350}
            />
        </div>
    );
};

export default WalletChart;

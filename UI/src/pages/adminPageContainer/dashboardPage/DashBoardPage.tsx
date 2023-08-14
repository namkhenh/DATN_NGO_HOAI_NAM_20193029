import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './DashBoardPage.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Thống kê Bệnh nhân',
        },
    },
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Thống kê Doanh thu',
        },
    },
};

const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

export const data1 = {
    labels,
    datasets: [
        {
            id: 1,
            label: 'BN đặt khám',
            data: [5, 6, 7, 10, 6,2,7],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            id: 2,
            label: 'BN tới khám',
            data: [3, 2, 1, 8, 6, 2, 5],
            backgroundColor: 'rgba(255, 23, 132, 0.5)',
        },
    ],
};

export const data2 = {
    labels,
    datasets: [
        {
            id: 1,
            label: 'Tiền khám dịch vụ',
            data: [1000000, 1200000, 900000, 2820000, 1620000],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export function DashboardPage() {
    return <div className='dashboard-page'>
        <Bar options={options1} data={data1} />
        <Bar options={options2} data={data2} />
    </div>;
}

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Typography } from 'antd';
import PageHead from '@/components/common/components/PageHead';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <PageHead title="Home" />
            <Typography.Title>Hello Dashboard</Typography.Title>
        </>
    );
}

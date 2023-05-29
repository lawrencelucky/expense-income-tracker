import React, { useEffect } from 'react';
import PageHead from '@/components/common/components/PageHead';
import { useRouter } from 'next/router';
import constants from '@/config/constants';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace(constants.CLIENT_ROUTES.dashboard);
    }, [router]);
    return (
        <>
            <PageHead title="Home" />
        </>
    );
}

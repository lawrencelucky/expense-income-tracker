import React, { useEffect } from 'react';
import PageHead from '@/components/common/components/PageHead';
import { useRouter } from 'next/router';
import constants from '@/config/constants';
import useAuth from '@/hooks/guards/useAuth';

export default function Home() {
    // useAuth();

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

import React, { useEffect } from 'react';
import PageHead from '@/components/common/components/PageHead';
import useAuth from '@/hooks/guards/useAuth';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';

export default function Home() {
    useAuth();

    const { data } = useUser();

    const router = useRouter();

    useEffect(() => {
        if (data) {
            router.replace('/dashboard');
        }
    }, [router, data]);

    return <PageHead title="Home" />;
}

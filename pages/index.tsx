import React from 'react';
import PageHead from '@/components/common/components/PageHead';
import useAuth from '@/hooks/guards/useAuth';

export default function Home() {
    useAuth();

    return <PageHead title="Home" />;
}

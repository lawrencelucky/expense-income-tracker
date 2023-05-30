import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import OtpPinForm from '@/components/pageComponents/Auth/OtpPinForm';
import React from 'react';

const OtpLogin = () => {
    return (
        <>
            <PageHead title="Pin Page" />
            <AuthLayout>
                <OtpPinForm />
            </AuthLayout>
        </>
    );
};

export default OtpLogin;

import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import SetupPinForm from '@/components/pageComponents/Auth/SetupPinForm';
import React from 'react';

const OtpLogin = () => {
    return (
        <>
            <PageHead title="Setup Pin" />
            <AuthLayout>
                <SetupPinForm />
            </AuthLayout>
        </>
    );
};

export default OtpLogin;

import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import VerifyResetOtpForm from '@/components/pageComponents/Auth/VerifyResetOtpForm';
import React from 'react';

const VerifyRegistration = () => {
    return (
        <>
            <PageHead title="Verify Reset Otp" />
            <AuthLayout>
                <VerifyResetOtpForm />
            </AuthLayout>
        </>
    );
};

export default VerifyRegistration;

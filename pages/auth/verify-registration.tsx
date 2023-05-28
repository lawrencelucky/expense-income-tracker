import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import VerifyRegistrationForm from '@/components/pageComponents/Auth/VerifyRegistrationForm';
import React from 'react';

const VerifyRegistration = () => {
    return (
        <>
            <PageHead title="Verify" />
            <AuthLayout>
                <VerifyRegistrationForm />
            </AuthLayout>
        </>
    );
};

export default VerifyRegistration;

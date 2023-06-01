import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import InitiateResetPinForm from '@/components/pageComponents/Auth/InitiateResetPinForm';
import React from 'react';

const InitiateResetPin = () => {
    return (
        <>
            <PageHead title="Initiate-Reset-Pin" />
            <AuthLayout>
                <InitiateResetPinForm />
            </AuthLayout>
        </>
    );
};

export default InitiateResetPin;

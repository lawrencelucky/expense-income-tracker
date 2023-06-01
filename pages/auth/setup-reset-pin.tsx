import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import SetUpResetPinForm from '@/components/pageComponents/Auth/SetUpResetPinForm';
import React from 'react';

const SetUpResetPin = () => {
    return (
        <>
            <PageHead title="Setup Reset Pin" />
            <AuthLayout>
                <SetUpResetPinForm />
            </AuthLayout>
        </>
    );
};

export default SetUpResetPin;

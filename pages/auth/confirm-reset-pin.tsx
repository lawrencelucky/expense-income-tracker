import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import ConfirmResetPinForm from '@/components/pageComponents/Auth/ConfirmResetPinForm';
import React from 'react';

const ConfirmResetPin = () => {
    return (
        <>
            <PageHead title="Confirm Reset Pin" />
            <AuthLayout>
                <ConfirmResetPinForm />
            </AuthLayout>
        </>
    );
};

export default ConfirmResetPin;

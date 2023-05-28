import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import RegisterForm from '@/components/pageComponents/Auth/RegisterForm';
import React from 'react';

const register = () => {
    return (
        <>
            <PageHead title="Register" />
            <AuthLayout>
                <RegisterForm />
            </AuthLayout>
        </>
    );
};

export default register;

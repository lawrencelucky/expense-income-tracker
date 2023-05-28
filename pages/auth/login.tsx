import PageHead from '@/components/common/components/PageHead';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/components/pageComponents/Auth/LoginForm';
import React from 'react';

const login = () => {
    return (
        <>
            <PageHead title="Login" />
            <AuthLayout>
                <LoginForm />
            </AuthLayout>
        </>
    );
};

export default login;

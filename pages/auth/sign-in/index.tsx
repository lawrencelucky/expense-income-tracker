import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginInputForm from '@/components/pageComponents/Auth/LoginInputForm';

const signIn = {
    headingText: 'Welcome Back!',
    metaText: 'Sign in to your dashboard',
};

const index = () => {
    return (
        <AuthLayout headingText={signIn.headingText} metaText={signIn.metaText}>
            <LoginInputForm />
        </AuthLayout>
    );
};

export default index;

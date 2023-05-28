import React from 'react';

interface IProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
    return <div className="min-h-screen grid place-items-center bg-novelgray-50">{children}</div>;
};

export default AuthLayout;

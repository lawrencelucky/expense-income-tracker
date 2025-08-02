import Button from '@/components/common/components/Button';
import icons from '@/icons';
import { Input, Typography, Dropdown, Avatar, Menu } from 'antd';
import Link from 'next/link';
import React from 'react';

interface IProps {
    title: string;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hasButton?: boolean;
    btnText?: string;
    handleClick?: () => void;
}

const Header: React.FC<IProps> = ({ title, setVisible, hasButton, btnText, handleClick }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center space-x-5">
                <div className="flex space-x-2 items-center">
                    <span className="md:hidden" onClick={() => setVisible(true)}>
                        {icons.hamburgerIcon()}
                    </span>
                    <Typography.Text className="text-lg font-bold">{title}</Typography.Text>
                </div>
            </div>

            {hasButton && (
                <Button
                    name={btnText}
                    className="bg-novelgreen-10 text-white hover:!text-white border-0"
                    onClick={handleClick}
                />
            )}
        </div>
    );
};

export default Header;

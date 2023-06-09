import icons from '@/icons';
import { Input, Typography, Dropdown, Avatar, Menu, Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import ProfileDropdown from '@/pageComponents/Dashboard/ProfileDropdown';

interface IProps {
    title: string;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hasButton?: boolean;
    btnText?: string;
    handleClick?: () => void;
}

const Header: React.FC<IProps> = ({ title, setVisible }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center space-x-5">
                <div className="flex space-x-2 items-center">
                    <span className="md:hidden" onClick={() => setVisible(true)}>
                        {icons.hamburgerIcon()}
                    </span>
                    <Typography.Text className="text-lg font-bold">{title}</Typography.Text>
                </div>
                <Input
                    prefix={icons.searchIcon()}
                    placeholder="Search for farms, farmers & stock informations..."
                    className="py-2 w-2/4 border-0  hover:!border-0 hidden lg:flex font-medium text-sm"
                />
            </div>
            <ProfileDropdown />
        </div>
    );
};

export default Header;

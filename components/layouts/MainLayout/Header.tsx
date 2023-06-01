import icons from '@/icons';
import { Input, Typography, Dropdown, Avatar, Menu, Button } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import constants from '@/config/constants';
import ProfileDropdown from '@/pageComponents/Dashboard/ProfileDropdown';
interface IProps {
    title: string;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hasButton?: boolean;
    btnText?: string;
    handleClick?: () => void;
}

// const menu = (
//     <Menu className="w-[270px]">
//         <Menu.Item key="1">
//             <div className="flex">
//                 <Avatar size={40} src="/svgs/userAvatar.svg" />
//                 <div className="flex flex-col">
//                     <Typography.Text>
//                         <span className="ml-[10px] font-bold">Acme Do</span>
//                     </Typography.Text>
//                     <Typography.Text>
//                         <span className="ml-[10px] text-[#A0A0AB] font-medium">acme@novelag.com</span>
//                     </Typography.Text>
//                 </div>
//             </div>
//         </Menu.Item>
//         <Menu.Item key="2" icon={<div className="text-base fill-current">{icons.userIcon()}</div>}>
//             <Link href={constants.CLIENT_ROUTES.profile} passHref className="!text-[#3F3F46] font-medium text-[12px]">
//                 Profile settings
//             </Link>
//         </Menu.Item>
//         <Menu.Item key="3" icon={<div className="text-base fill-current">{icons.signOutIcon()}</div>}>
//             <span className="text-[#3F3F46] font-medium text-[12px]">Sign out</span>
//         </Menu.Item>
//     </Menu>
// );
const Header: React.FC<IProps> = ({ title, setVisible, hasButton, btnText, handleClick }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-1 items-center space-x-16">
                <div className="flex space-x-2 items-center">
                    <span className="md:hidden" onClick={() => setVisible(true)}>
                        {icons.hamburgerIcon()}
                    </span>
                    <Typography.Text className="text-2xl font-medium">{title}</Typography.Text>
                </div>
                <Input
                    prefix={icons.searchIcon()}
                    placeholder="Search"
                    suffix="⌘S"
                    className="py-2 w-2/4 shadow-10 border border-[#FAFAF9] hidden lg:flex"
                />
            </div>
            <ProfileDropdown />
        </div>
    );
};

export default Header;

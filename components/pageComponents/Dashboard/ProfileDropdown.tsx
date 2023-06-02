import { Menu, Dropdown, Avatar, Typography } from 'antd';
import Link from 'next/link';
import icons from '@/icons';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import constants from '@/config/constants';

const { Text } = Typography;
const { COOKIES, CLIENT_ROUTES } = constants;

const ProfileDropdown = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        destroyCookie(null, COOKIES.key, { path: COOKIES.path });
        router.replace(CLIENT_ROUTES.auth.login);
    };

    const menu = (
        <Menu className="w-[270px]">
            <Menu.Item key="1">
                <div className="flex">
                    <Avatar size={40} src="/svgs/userAvatar.svg" />
                    <div className="flex flex-col">
                        <Text>
                            <span className="ml-[10px] font-bold">Acme Do</span>
                        </Text>
                        <Text>
                            <span className="ml-[10px] text-[#A0A0AB] font-medium">acme@novelag.com</span>
                        </Text>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="2" icon={<div className="text-base fill-current">{icons.userIcon()}</div>}>
                <Link href={CLIENT_ROUTES.profile} passHref className="!text-[#3F3F46] font-medium text-[12px]">
                    Profile settings
                </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<div className="text-base fill-current">{icons.signOutIcon()}</div>}>
                <span className="text-[#3F3F46] font-medium text-[12px]" onClick={handleLogout}>
                    Sign out
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Avatar size={40} src="/svgs/userAvatar.svg" />
        </Dropdown>
    );
};

export default ProfileDropdown;

import { Menu, Dropdown, Avatar, Typography } from 'antd';
import Link from 'next/link';
import icons from '@/icons';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import constants from '@/config/constants';
import './dashboard.module.scss';
import { create } from 'zustand';
import user from '@/config/services/user';
import ProfilePicture from './ProfilePicture';

const { Text } = Typography;
const { COOKIES, CLIENT_ROUTES } = constants;
interface UserData {
    data?: any;
}

interface Store {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
}

const useStore = create<Store>((set) => ({
    setUserData: (data) => set(() => ({ userData: data })),

    userData: null,
}));

const ProfileDropdown = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useStore();
    // const [userObj] = useState(userData?.data?.user?.first_name + ' ' + userData?.data?.user?.last_name);
    // const [user] = useState(userData);
    console.log(userData?.data?.user?.first_name + ' ' + userData?.data?.user?.last_name, 'ANOTHER DROPDOWN');
    // console.log(userObj, 'DROPDOWN DATA');
    const handleLogout = () => {
        setLoading(true);
        destroyCookie(null, COOKIES.key, { path: COOKIES.path });
        router.replace(CLIENT_ROUTES.auth.login);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: UserData = await user.getDetails();
                setUserData(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const menu = (
        <Menu className="w-[270px] profile-dropdown">
            <Menu.Item key="1">
                <div className="flex">
                    <ProfilePicture
                        name={userData?.data?.user?.first_name + ' ' + userData?.data?.user?.last_name}
                        imageUrl={userData?.data?.user?.profile_picture}
                        size={40}
                    />
                    {/* <Avatar size={40} src="/svgs/userAvatar.svg" /> */}
                    <div className="flex flex-col">
                        <Text>
                            <span className="ml-[10px] font-bold text-[12px]">
                                {userData?.data?.user?.first_name} {userData?.data?.user?.last_name}
                            </span>
                        </Text>
                        <Text>
                            <span className="ml-[10px] text-[#A0A0AB] font-medium text-[12px]">
                                {userData?.data?.user?.email}
                            </span>
                        </Text>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="2" icon={<div className="text-base fill-current">{icons.profileIcon()}</div>}>
                <Link href={CLIENT_ROUTES.profile} passHref className="!text-[#3F3F46] font-medium text-[12px]">
                    Profile settings
                </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<div className="text-base fill-current">{icons.logOutIcon()}</div>}
                onClick={handleLogout}
            >
                <span className="text-[#3F3F46] font-medium text-[12px]" onClick={handleLogout}>
                    Sign out
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="space-x-7 flex items-center">
            <div className="flex items-center space-x-1">
                <span>{icons.helpFillIcon()}</span>
                <Typography.Text>Get Help</Typography.Text>
            </div>
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar size={32} src="/svgs/userAvatar.svg" className="cursor-pointer" />
            </Dropdown>
        </div>
    );
};

export default ProfileDropdown;

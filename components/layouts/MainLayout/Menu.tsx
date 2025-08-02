import React from 'react';
import { Menu as AntdMenu, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import constants from '@/config/constants';

const Menu = () => {
    const { pathname } = useRouter();
    const pathnameArray = pathname.split('/');

    return (
        <section className="flex flex-col justify-between h-full overflow-y-auto overflow-x-hidden">
            <div className="space-y-10 py-6">
                <div className="flex items-center px-3">
                    <Typography className="text-lg font-bold">Expense - Income Tracker</Typography>
                </div>

                <div className="">
                    <AntdMenu
                        defaultSelectedKeys={[pathname]}
                        selectedKeys={[`/${pathnameArray[1]}`]}
                        defaultOpenKeys={[...pathnameArray]}
                        mode="inline"
                        className="novel-app-menu"
                    >
                        {constants.APP_MENU.map(({ icon, link, name }) => (
                            <AntdMenu.Item
                                icon={<div className="icon text-base fill-current">{icon}</div>}
                                key={link}
                                className="text-[14px] text-novelgray-70 font-medium bg-transparent !rounded-none !px-5"
                            >
                                <Link href={link} passHref className="!text-novelgray-70">
                                    {name}
                                </Link>
                            </AntdMenu.Item>
                        ))}
                    </AntdMenu>
                </div>
            </div>
        </section>
    );
};

export default Menu;

import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import icons from '@/icons';
import { create } from 'zustand';
import user from '@/config/services/user';
import helpers from '@/components/common/utils/helper';
import farms from '@/config/services/farms';

interface UserData {
    data?: any;
}

interface Store {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    farmsData: UserData | null;
    setFarmsData: (data: UserData | null) => void;
}

// interface Store {
//     farmsData: UserData | null;
//     setFarmsData: (data: UserData | null) => void;
// }
const useStore = create<Store>((set) => ({
    farmsData: null,
    setFarmsData: (data) => set(() => ({ farmsData: data })),
    setUserData: (data) => set(() => ({ userData: data })),
    userData: null,
}));

const CardsDesktop = () => {
    const { userData, farmsData, setFarmsData, setUserData } = useStore();
    const [pagination, setPagination] = useState({ limit: 10, page: 1 });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: UserData = await user.getDetails();
                setUserData(response);
                // helpers.openNotification({ message: 'User loaded', type: 'success' });
            } catch (error) {
                helpers.openNotification({ message: 'Error loading user', type: 'error' });
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchFarmData = async () => {
            try {
                const response: UserData = await farms.getFarmDetails({ ...pagination });
                setFarmsData(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFarmData();
    }, []);

    // console.log(farmsData, 'farm data');
    return (
        <div className="grid grid-cols-4 gap-6">
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">Balance</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-1">
                    <Typography.Text className="text-lg">₦{userData?.data?.user?.wallet?.balance}</Typography.Text>
                    <div className="flex justify-end">
                        {/* <Typography.Text>Recurring Revenue</Typography.Text> */}
                        {userData?.data?.user?.wallet?.balance == 0 ? (
                            <span>{icons.progressIcon()}</span>
                        ) : (
                            <span>{icons.progressIconGreen()}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">No of farms</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-1">
                    {farmsData?.data?.farms?.length == 0 ? (
                        <Typography.Text className="text-lg">0</Typography.Text>
                    ) : (
                        <Typography.Text className="text-lg">{farmsData?.data?.farms?.length}</Typography.Text>
                    )}
                    <div className="flex justify-end">
                        {/* <Typography.Text>In total</Typography.Text> */}
                        {farmsData?.data?.totalRows == 0 ? (
                            <span>{icons.progressIcon()}</span>
                        ) : (
                            <span>{icons.progressIconGreen()}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">No of Crops</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-1">
                    {farmsData?.data?.totalCropsCount ? (
                        <Typography.Text className="text-lg">0</Typography.Text>
                    ) : (
                        <Typography.Text className="text-lg">{farmsData?.data?.totalCropsCount}</Typography.Text>
                    )}
                    <div className="flex justify-end">
                        {/* <Typography.Text>In total</Typography.Text> */}
                        {farmsData?.data?.totalCropsCount == 0 ? (
                            <span>{icons.progressIcon()}</span>
                        ) : (
                            <span>{icons.progressIconGreen()}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="shadow-30 rounded-lg bg-white h-[95px]">
                <div className="flex items-center justify-between px-6 py-1 border-[#F5F5F4]">
                    <Typography.Text className="text-[#A0A0AB] text-sm">Stock Quantity</Typography.Text>
                    <span>{icons.moreIcon()}</span>
                </div>
                <div className="px-6 py-1 space-y-2">
                    <Typography.Text className="text-lg">0</Typography.Text>
                    <div className="flex justify-end">
                        {/* <Typography.Text>In total</Typography.Text> */}
                        <span>{icons.progressIcon()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsDesktop;

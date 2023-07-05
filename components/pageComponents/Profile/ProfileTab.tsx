import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import EmptyStateProfileFarm from './EmptyStateProfileFarm';
import EmptyStateProfileWare from './EmptyStateProfileWare';
import FarmTable from '../Dashboard/FarmTable';
import WareHouseTable from '..//Dashboard/WareHouseTable';
import { create } from 'zustand';
import farms from '@/config/services/farms';

interface TabProps {
    label: string;
    active: boolean;
    onClick: () => void;
}
interface DataType {
    data?: any;
}

interface Store {
    farmsData: DataType | null;
    setFarmsData: (data: DataType | null) => void;
}

const useStore = create<Store>((set) => ({
    farmsData: null,
    setFarmsData: (data) => set(() => ({ farmsData: data })),
}));

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
    return (
        <div
            className={`flex justify-center items-center w-full py-[3px] rounded-[100px] ${
                active ? 'bg-white shadow-70' : ''
            }`}
            onClick={onClick}
        >
            <Typography.Text className={active ? 'text-[#26272B]' : 'text-[#A0A0AB]'}>{label}</Typography.Text>
        </div>
    );
};

const TabComponent: React.FC = () => {
    const { farmsData, setFarmsData } = useStore();

    useEffect(() => {
        const fetchFarmData = async () => {
            try {
                const response: DataType = await farms.getFarmDetails();
                setFarmsData(response || { data: [] });
            } catch (error) {
                console.log(error);
            }
        };
        fetchFarmData();
    }, []);

    const [activeTab, setActiveTab] = useState<string>('farms');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const renderContent = () => {
        if (activeTab === 'farms') {
            return farmsData?.data?.farms?.length !== 0 ? <FarmTable /> : <EmptyStateProfileFarm />;
        }
        if (activeTab === 'warehouse') {
            return true ? <WareHouseTable /> : <EmptyStateProfileWare />;
        }
        return null;
    };
    console.log(farmsData?.data?.farms, 'farmsData?.data=farmsData?.data');

    return (
        <div className="rounded-lg border-1">
            <div className="rounded-full border-1 bg-[#F5F5F4] w-[192px] p-1 h-[45px] flex justify-center cursor-pointer">
                <Tab label="Farms" active={activeTab === 'farms'} onClick={() => handleTabChange('farms')} />
                <Tab
                    label="Warehouse"
                    active={activeTab === 'warehouse'}
                    onClick={() => handleTabChange('warehouse')}
                />
            </div>
            {renderContent()}
        </div>
    );
};

export default TabComponent;

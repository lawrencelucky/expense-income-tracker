import React, { useState } from 'react';
import { Typography } from 'antd';
import EmptyStateProfileFarm from './EmptyStateProfileFarm';
import EmptyStateProfileWare from './EmptyStateProfileWare';
import Table from '../Dashboard/Table';

interface TabProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

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
    const [activeTab, setActiveTab] = useState<string>('farms');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const renderContent = () => {
        if (activeTab === 'farms') {
            return <EmptyStateProfileFarm />; // Replace with your Farms content
        }
        if (activeTab === 'warehouse') {
            return <EmptyStateProfileWare />; // Replace with your Warehouse content
        }
        return null;
    };

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

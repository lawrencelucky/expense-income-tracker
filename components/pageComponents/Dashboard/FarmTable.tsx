import React, { useEffect } from 'react';
import { Typography, Table as AntdTable, Space, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import icons from '@/icons';
import { create } from 'zustand';
import farms from '@/config/services/farms';

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

const FarmTable: React.FC = () => {
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
    const handlePress = () => console.log('he touched me!!');

    return (
        <div className="mt-[64px] mb-[250px]">
            <Typography.Text className="text-lg block mb-5">Farms</Typography.Text>
            <div className="rounded-2xl overflow-hidden no-scrollbar">
                <AntdTable
                    columns={[
                        {
                            dataIndex: 'name',
                            key: 'name',
                            render: (_, record) => <Typography.Text>{record.name}</Typography.Text>,
                            title: 'Name',
                        },
                        {
                            dataIndex: 'size',
                            key: 'size',
                            render: (_, record) => (
                                <Typography.Text>
                                    {record.size} {record.size_unit}
                                </Typography.Text>
                            ),
                            title: (
                                <span className="flex items-center">
                                    Size <span className="ml-2">{icons.helpIcon()}</span>
                                </span>
                            ),
                            width: 150,
                        },
                        {
                            dataIndex: 'location',
                            key: 'location',
                            render: (_, record) => <Typography.Text>{record.location_address}</Typography.Text>,
                            title: 'Location',
                            width: 150,
                        },
                        {
                            dataIndex: 'crops',
                            key: 'crops',
                            render: (_, record) => {
                                const cropNames = record.crops.map((item) => item.name);
                                const displayedCropNames = cropNames.slice(0, 2);
                                const remainingCropCount = cropNames.length - displayedCropNames.length;

                                return (
                                    <div>
                                        {displayedCropNames.join(', ')}
                                        {remainingCropCount > 0 && (
                                            <Typography.Text>{` + ${remainingCropCount} more`}</Typography.Text>
                                        )}
                                    </div>
                                );
                            },
                            title: 'Crop (s)',
                            width: 150,
                        },
                        {
                            dataIndex: 'status',
                            key: 'status',
                            render: (_, record) => (
                                <Typography.Text
                                    className={`${
                                        record.status === 'active' ? 'bg-[#D8F7C7]' : 'bg-[#F8DCE3]'
                                    } px-2 py-1 rounded-full`}
                                >
                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                </Typography.Text>
                            ),
                            title: 'Status',
                            width: 150,
                        },
                        {
                            dataIndex: 'action',
                            key: 'action',
                            render: () => (
                                <Button
                                    className="border-novelgray-30 text-xs font-bold text-novelgray-30 flex items-center hover:!border-novelgreen-10 hover:!text-novelgreen-10"
                                    onClick={handlePress}
                                >
                                    View <span className="ml-2">{icons.eyeIcon()}</span>
                                </Button>
                            ),
                            title: 'Action',
                            width: 150,
                        },
                    ]}
                    dataSource={farmsData?.data?.farms}
                    scroll={{ x: 'max-content', y: 'max-content' }}
                    pagination={false}
                    className="no-scrollbar"
                />
                <div className="flex justify-center lg:justify-end mt-6 space-x-10">
                    <div className="flex items-center space-x-2">
                        <Typography.Text className="text-[#A0A0AB]">Rows per page:</Typography.Text>
                        <span className="flex items-center">4 {icons.arrowDown()}</span>
                    </div>

                    <div className="flex items-center space-x-5">
                        <Typography.Text className="text-[#A0A0AB]">1 - 8 of 124</Typography.Text>
                        <div className="flex items-center space-x-2">
                            <span>{icons.leftIcon()}</span>
                            <span>{icons.rightIconBig()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmTable;

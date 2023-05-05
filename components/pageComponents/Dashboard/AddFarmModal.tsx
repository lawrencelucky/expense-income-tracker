import React, { useEffect, useState } from 'react';
import Modal from '@/components/common/components/Modal';
import MultiSelect from '@/components/common/components/MultiSelect';
import Input from '@/components/common/components/Input';
import icons from '@/icons';
import { Tooltip, Typography } from 'antd';
import Select from '@/components/common/components/Select';
import SelectWithInnerDropdown from '@/components/common/components/SelectWithInnerDropdown';

interface IProps {
    openAddFarmModal: boolean;
    setOpenAddFarmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFarmModal: React.FC<IProps> = ({ openAddFarmModal, setOpenAddFarmModal }) => {
    const [selectedStatus, setSelectedStatus] = useState<{ label: string; id: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState([]);

    useEffect(() => {
        if (statusOptions) {
            setSelectedStatus([]);
        }
    }, [statusOptions]);

    const handleMultiSelectChange = (value) => {
        setStatusOptions(value);
    };

    return (
        <Modal title="Add Farm" open={openAddFarmModal} onCancel={() => setOpenAddFarmModal(false)} okText="Save">
            <div>
                <label className="text-sm mb-2 block font-medium">Crop Cultivated</label>
                <MultiSelect
                    options={[
                        { label: 'Yam', value: 'Yam' },
                        { label: 'Rice', value: 'Rice' },
                        { label: 'Millet', value: 'Millet' },
                        { label: 'Beans', value: 'Beans' },
                        { label: 'Cassava', value: 'Cassava' },
                        { label: 'Cashew', value: 'Cashew' },
                        { label: 'Mango', value: 'Mango' },
                        { label: 'Watermelon', value: 'Watermelon' },
                        { label: 'Gauva', value: 'Gauva' },
                        { label: 'Apple', value: 'Apple' },
                    ]}
                    maxTagCount="responsive"
                    onChange={handleMultiSelectChange}
                    placeholder="Select Crop(s)"
                />
            </div>
            <div>
                <label className="text-sm mb-2 flex items-center font-medium ">
                    Crop Status(es)
                    <Tooltip title="Add status to crop listed in your farm" className="ml-2 cursor-pointer">
                        <span>{icons.infoIcon()}</span>
                    </Tooltip>
                </label>
                <SelectWithInnerDropdown
                    placeholder="No status added yet"
                    options={statusOptions}
                    setSelected={setSelectedStatus}
                    selected={selectedStatus}
                />
            </div>

            <div>
                <label className="text-sm mb-2 block font-medium">Farm Name</label>
                <Input type="text" placeholder="Enter Farm Name" />
            </div>

            <div>
                <label className="text-sm mb-2 block font-medium">Farm Location</label>
                <Input type="text" placeholder="Enter Location" />
                <Typography.Text className="-mt-5 flex items-center text-novelgreen-10 cursor-pointer">
                    {icons.locationIcon()} <span className="ml-2">Use Current Location</span>
                </Typography.Text>
            </div>

            <div className="mt-7">
                <label className="text-sm mb-2 block font-medium">Farm Size</label>
                <Input
                    type="text"
                    placeholder="Enter Farm Size"
                    suffix="Hectares"
                    bordered
                    className="border-novelgray-10 p-3 hover:!border-novelgray-10 focus:!shadow-none focus:!ring-0"
                />
            </div>

            <div>
                <label className="text-sm mb-2 block font-medium">Farm Status</label>
                <Select
                    placeholder="Select Farm Status"
                    options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                    ]}
                />
            </div>
        </Modal>
    );
};

export default AddFarmModal;

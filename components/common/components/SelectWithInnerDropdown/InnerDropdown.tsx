import useClickWindow from '@/hooks/useClickWindow';
import icons from '@/icons';
import { Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import helpers from '../../utils/helper';

const items = ['Ridging', 'Sowing', 'Fertilization', 'Adding Manure', 'Harvesting'];

interface IProps {
    option: string;
    options: string[];
    selected:
        | {
              label: string;
              id: string;
          }[];
    setSelected: React.Dispatch<
        React.SetStateAction<
            | {
                  label: string;
                  id: string;
              }[]
        >
    >;
}

const InnerDropdown: React.FC<IProps> = ({ option, setSelected, selected }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useClickWindow(() => setOpenDropdown(false));

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    const handleSelect = (item: string) => {
        const isExist = selected.find((sctd) => sctd.id.includes(option));

        if (!isExist) {
            setSelected([...selected, { id: `${option}-${item}`, label: item }]);
        } else {
            const indexOf = selected.indexOf(isExist);
            const newArray = helpers.replaceItemInArray(selected, indexOf, { id: `${option}-${item}`, label: item });
            setSelected(newArray);
        }
    };

    return (
        <div ref={dropdownRef} className="relative">
            <div className="flex items-center space-x-2" onClick={toggleDropdown}>
                <Typography.Text
                    className={`${
                        selected.find((sctd) => sctd.id.includes(option)) ? 'text-novelgray-40' : 'text-novelgray-30'
                    } text-base`}
                >
                    {selected.find((sctd) => sctd.id.includes(option))
                        ? selected.map((sctd) => sctd.id.includes(option) && sctd.label)
                        : 'Add Status'}
                </Typography.Text>
                <span>
                    {selected.find((sctd) => sctd.id.includes(option)) ? icons.grayArrowDown() : icons.addIconGray()}
                </span>
            </div>
            {openDropdown && (
                <div className="bg-white shadow-lg absolute z-20 w-[150px] right-0">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSelect(item)}
                            className={`${
                                selected.find((sctd) => sctd.id.includes(`${option}-${item}`)) ? 'bg-novelgreen-20' : ''
                            } p-2`}
                        >
                            <Typography.Text className="text-base text-novelgray-40">{item}</Typography.Text>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InnerDropdown;

import useClickWindow from '@/hooks/useClickWindow';
import icons from '@/icons';
import { Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import InnerDropdown from './InnerDropdown';

interface IProps {
    placeholder: string;
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

const SelectWithInnerDropdown: React.FC<IProps> = ({ placeholder, options, setSelected, selected }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useClickWindow(() => setOpenDropdown(false));

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    return (
        <div className="mb-8 relative" ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className="border h-[48px] border-novelgray-20 p-3 rounded-lg cursor-pointer relative"
            >
                {selected.length ? (
                    <div className="space-x-2 overflow-x-auto overflow-hidden whitespace-nowrap no-scrollbar w-[95%]">
                        {selected.map((sctd, idx) => (
                            <div key={idx} className="inline-block border border-novelgray-20  px-2 rounded-full">
                                <Typography.Text>{sctd.label}</Typography.Text>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="text-novelgray-30 ">{placeholder}</span>
                )}
                <span className="absolute right-[12px] top-[16px]">{icons.selectIcon()}</span>
            </div>
            {openDropdown && (
                <div className="bg-white mt-1 p-3 absolute shadow-xl rounded-lg w-full z-10">
                    {options.length ? (
                        options.map((option, idx) => (
                            <div key={idx} className="cursor-pointer p-2 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span>{icons.checkmarkIcon()}</span>
                                    <Typography.Text className="text-base text-novelgray-40">{option}</Typography.Text>
                                </div>
                                <InnerDropdown
                                    options={options}
                                    option={option}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        ))
                    ) : (
                        <Typography.Text className="text-novelgray-30">
                            You have not selected any crop cultivated
                        </Typography.Text>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectWithInnerDropdown;

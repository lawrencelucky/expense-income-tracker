import React, { useState } from 'react';
import { Avatar, Button, Card, Typography } from 'antd';
import './profile.module.scss';
import icons from '@/icons';
import AssignAgentDropdown from './AssignAgentDropdown';

const ProfileCard: React.FC = () => {
    const [infoState, setInfoState] = useState<boolean>(false);
    const [cardHeight, setCardHeight] = useState<string>('218px');

    const toggleInformation = () => {
        setInfoState(!infoState);
        setCardHeight(infoState ? '218px' : 'auto');
    };

    return (
        <Card className="gradient-card !rounded-lg" style={{ height: cardHeight }}>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <Avatar size={54} src="/svgs/userAvatar.svg" />
                </div>
                <div>
                    <Button className="flex">
                        <span className="mt-1 mr-2">{icons.editIcon()}</span>Edit Profile
                    </Button>
                </div>
            </div>
            <div className="flex flex-col mt-[14px]">
                <Typography.Text>
                    <span className="font-bold text-[16px] text-[#26272B] ">Garba Felix</span>
                </Typography.Text>
                <Typography.Text>
                    <span className="text-[#3F3F46] font-normal">gargba@novelg.com</span>
                </Typography.Text>
                <div className="flex mt-[18px]" onClick={toggleInformation}>
                    <span className="mt-2 mr-2">{icons.carretDownIcon()}</span>
                    <Typography.Text>
                        <span className="text-[#16B364]">{infoState ? 'Less Information' : 'More Information'}</span>
                    </Typography.Text>
                </div>
                {infoState && (
                    <div>
                        <ul className="pl-[25px] py-[25px]">
                            <li className="">0900000000</li>
                            <li className="">Farmer’s LGA & ward appears here</li>
                        </ul>
                        <AssignAgentDropdown />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ProfileCard;

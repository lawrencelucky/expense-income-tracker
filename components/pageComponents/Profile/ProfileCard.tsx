import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Typography, Modal } from 'antd';
import './profile.module.scss';
import icons from '@/icons';
import AssignAgentDropdown from './AssignAgentDropdown';
import EditProfileFormModal from './EditProfileFormModal';
import ProfileSettingsFormModal from './profileSettingsFormModal';
import { create } from 'zustand';
import user from '@/config/services/user';

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

const ProfileCard: React.FC = () => {
    const [infoState, setInfoState] = useState<boolean>(false);
    const { userData, setUserData } = useStore();
    const [cardHeight, setCardHeight] = useState<string>('218px');
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [openProfileSettingsModal, setOpenProfileSettingsModal] = useState(false);
    const toggleInformation = () => {
        setInfoState(!infoState);
        setCardHeight(infoState ? '218px' : 'auto');
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
    console.log(userData, 'UserDATA');
    return (
        <>
            <Card className="gradient-card !rounded-lg h-[218px]" style={{ height: cardHeight }}>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <Avatar size={54} src="/svgs/userAvatar.svg" />
                    </div>
                    <div className="flex space-x-[16px]">
                        {/* <Button
                            className="flex hover:!border-novelgreen-10 hover:!text-novelgreen-10 bg-white"
                            onClick={() => setOpenProfileSettingsModal(true)}
                        >
                            {icons.settingsProfileIcon()}
                        </Button> */}
                        <Button
                            className="flex hover:!border-novelgreen-10 hover:!text-novelgreen-10 bg-white"
                            onClick={() => setOpenEditProfileModal(true)}
                        >
                            <span className="mt-1 mr-2">{icons.editIcon()}</span>Edit Profile
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col mt-[14px]">
                    <Typography.Text>
                        <span className="font-bold text-[16px] text-[#26272B] ">
                            {userData?.data?.user?.first_name} {userData?.data?.user?.last_name}
                        </span>
                    </Typography.Text>
                    <Typography.Text>
                        <span className="text-[#3F3F46] font-normal text-[14px]">{userData?.data?.user?.email}</span>
                    </Typography.Text>
                    <div className="flex mt-[18px] cursor-pointer" onClick={toggleInformation}>
                        <span className="mt-2 mr-2">{icons.carretDownIcon()}</span>
                        <Typography.Text>
                            <span className="text-[#16B364]">
                                {infoState ? 'Less Information' : 'More Information'}
                            </span>
                        </Typography.Text>
                    </div>
                    {infoState && (
                        <div>
                            <ul className="pl-[5px] mt-[24px] mb-[10px]">
                                <li>
                                    <span className="mr-2">&#183;</span>
                                    <span className="font-medium text-[12px]">{userData?.data?.user?.phone}</span>
                                </li>
                                <li>
                                    <span className="mr-2">&#183;</span>
                                    <span className="font-medium text-[12px]">
                                        {userData?.data?.state?.name}, {userData?.data?.local_government?.name} &{' '}
                                        {userData?.data?.ward?.name}
                                    </span>
                                </li>
                            </ul>
                            <AssignAgentDropdown />
                        </div>
                    )}
                </div>
            </Card>
            <ProfileSettingsFormModal
                openSettings={openProfileSettingsModal}
                onCloseSettings={() => setOpenProfileSettingsModal(false)}
            />
            <EditProfileFormModal openEdit={openEditProfileModal} onCloseEdit={() => setOpenEditProfileModal(false)} />
        </>
    );
};

export default ProfileCard;

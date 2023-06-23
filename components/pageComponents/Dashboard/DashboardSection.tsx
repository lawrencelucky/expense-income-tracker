import React, { useEffect } from 'react';
import Cards from './Cards';
import Table from './Table';
import AddFarmModal from './AddFarmModal';
import EmptyState from './EmptyState';
import { create } from 'zustand';
import user from '@/config/services/user';
interface IProps {
    openAddFarmModal: boolean;
    setOpenAddFarmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const DashboardSection: React.FC<IProps> = ({ openAddFarmModal, setOpenAddFarmModal }) => {
    const { userData, setUserData } = useStore();
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
    console.log(userData?.data?.farms.length, 'LENGTH');
    return (
        // REMEMBER TO SWAP THE STATES BACK ACCORDING TO THE LOGIC EDET
        <div className="space-y-10 mb-20">
            {userData?.data?.farms.length === 0 ? (
                <div>
                    <Cards />
                    <Table />{' '}
                </div>
            ) : (
                <EmptyState />
            )}

            {/* <EmptyState /> */}

            {/* <AddFarmModal openAddFarmModal={openAddFarmModal} setOpenAddFarmModal={setOpenAddFarmModal} /> */}
        </div>
    );
};

export default DashboardSection;

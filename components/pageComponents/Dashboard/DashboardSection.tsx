import React from 'react';
import Cards from './Cards';
import Table from './Table';
import AddFarmModal from './AddFarmModal';
import EmptyState from './EmptyState';

interface IProps {
    openAddFarmModal: boolean;
    setOpenAddFarmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSection: React.FC<IProps> = ({ openAddFarmModal, setOpenAddFarmModal }) => {
    return (
        <div className="space-y-10 mb-20">
            {/* <Cards />
            <Table /> */}

            <EmptyState />

            <AddFarmModal openAddFarmModal={openAddFarmModal} setOpenAddFarmModal={setOpenAddFarmModal} />
        </div>
    );
};

export default DashboardSection;

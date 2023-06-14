import Modal from '@/components/common/components/Modal';
import icons from '@/icons';
import { Typography } from 'antd';
import React from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const DeleteModal: React.FC<IProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onCancel={onClose} okText="Yes, Delete" className="no-border danger-modal">
            <div className="flex items-center space-x-4">
                <div>
                    <span>{icons.deleteCircleIcon()}</span>
                </div>
                <div>
                    <Typography.Text className="text-lg font-bold block mb-1">Delete Card</Typography.Text>
                    <Typography.Text className="text-sm text-novelgray-70">
                        Are you sure you want to delete this card?
                    </Typography.Text>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;

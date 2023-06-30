import Modal from '@/components/common/components/Modal';
import { useWindowSize } from '@/hooks/useWindowSize';
import icons from '@/icons';
import { Button, Typography } from 'antd';
import React from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const DeleteModal: React.FC<IProps> = ({ open, onClose }) => {
    const { width } = useWindowSize();

    return (
        <Modal
            open={open}
            onClose={onClose}
            className="no-border danger-modal"
            title={width > 600 ? '' : 'Delete Card'}
            height={250}
            footer={
                <div className="flex items-center justify-end space-x-4">
                    <Button onClick={onClose} className="novel-btn bg-novelred-30 md:w-fit">
                        Yes, Delete
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col md:flex-row items-center space-x-4">
                <div>
                    <span>{icons.deleteCircleIcon()}</span>
                </div>
                <div>
                    <Typography.Text className="text-lg font-bold md:block mb-1 hidden">Delete Card</Typography.Text>
                    <Typography.Text className="text-sm text-novelgray-70">
                        Are you sure you want to delete this card?
                    </Typography.Text>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;

import React, { ReactNode } from 'react';
import { Modal as AntdModal, ModalProps, Drawer } from 'antd';
import icons from '@icons';
import configConstants from '@config/constants';
import { useWindowSize } from '@hooks/useWindowSize';

const { SCREEN_SIZES } = configConstants;

interface IProps extends ModalProps {
    icon?: ReactNode;
    title?: string;
    onClose?: () => void;
    footer?: ReactNode;
    height?: number;
}

const Modal: React.FC<IProps> = (props) => {
    const { width } = useWindowSize();
    const { children, className = '', icon, onClose, footer, height } = props;

    return width >= SCREEN_SIZES.medium ? (
        <AntdModal
            {...props}
            width={500}
            closeIcon={icon || icons.closeIcon()}
            cancelText={false}
            onCancel={onClose}
            className={`novel-modal font-primary antialiased ${className} hidden md:block`}
        >
            {children}
        </AntdModal>
    ) : (
        <Drawer
            {...props}
            closeIcon={icon || icons.closeIcon()}
            placement="bottom"
            className={`novel-modal font-primary antialiased ${className}`}
            onClose={onClose}
            footer={footer}
            height={height}
        >
            {children}
        </Drawer>
    );
};

export default Modal;

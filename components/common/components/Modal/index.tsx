import React, { ReactNode } from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';
import icons from '@icons';
import configConstants from '@config/constants';
import { useWindowSize } from '@hooks/useWindowSize';

const { SCREEN_SIZES } = configConstants;

interface IProps extends ModalProps {
    icon?: ReactNode;
    title?: string;
}

const Modal: React.FC<IProps> = (props) => {
    const { width } = useWindowSize();
    const { children, className = '', icon, title } = props;

    return width >= SCREEN_SIZES.medium ? (
        <AntdModal
            {...props}
            width={500}
            closeIcon={icon || icons.closeIcon()}
            // footer={null}
            cancelText={false}
            className={`novel-modal font-primary antialiased ${className} hidden md:block`}
        >
            {children}
        </AntdModal>
    ) : (
        <AntdModal
            {...props}
            width={500}
            closeIcon={icon || icons.closeIcon()}
            // footer={null}
            cancelText={false}
            title={title}
            className={`novel-modal font-primary antialiased ${className}`}
        >
            {children}
        </AntdModal>
    );
};

export default Modal;

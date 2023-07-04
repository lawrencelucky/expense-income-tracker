import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface ProfilePictureProps {
    name: string;
    imageUrl?: string;
    size?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ name, imageUrl, size }) => {
    const getInitials = (name: string) => {
        const initials = name
            .split(' ')
            .map((part) => part.charAt(0).toUpperCase())
            .join('');

        return initials;
    };

    return (
        <Avatar size={size} src={imageUrl} alt="Profile Picture">
            {!imageUrl && getInitials(name)}
        </Avatar>
    );
};

export default ProfilePicture;

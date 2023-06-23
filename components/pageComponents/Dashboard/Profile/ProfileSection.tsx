import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import ProfileTabComponent from './ProfileTab';

const ProfileSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('farms');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };
    return (
        <div className="space-y-10 mb-20">
            <ProfileCard />
            <ProfileTabComponent />
        </div>
    );
};

export default ProfileSection;

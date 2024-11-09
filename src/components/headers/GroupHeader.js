import React from 'react';

import { IoSettingsSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

const GroupHeader = ({ group, owner }) => {
    const { user } = useAuth();
    const { addBreadcrumb } = useBreadcrumbs();

    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/groups/' + group.id + "/settings");
        addBreadcrumb("Settings", "/groups/"+group.id+"/settings");
    };

    const handleMembersClick = () => {
        navigate('/groups/' + group.id + "/members");
        addBreadcrumb("Members", "/groups/"+group.id+"/members");
    };

    return (
        <div className='group-locations-header'>
            <div className='group-info'>
                <div>
                    <div className='fs-1 fw-bold mb-2'>{group.name}</div>
                    <div className="d-flex align-items-center">
                        <FaUserGroup size={18} />
                        <div className='fs-6 ms-2 me-3'>{`${group.members_count} members`}</div>
                        <FaLocationDot size={18} />
                        <div className='fs-6 ms-2'>{`${group.locations_count} locations`}</div>
                    </div>

                </div>
            </div>
            <div className='group-actions'>
                <div 
                    className="header-icons" 
                    title='Members'
                    onClick={handleMembersClick}
                >
                    <FaUserGroup
                        size={25}
                    />
                </div>
                {owner.id === user.id && (
                    <div 
                        className="header-icons" 
                        title='Settings'
                        onClick={handleSettingsClick}
                    >
                        <IoSettingsSharp
                            size={25}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupHeader;

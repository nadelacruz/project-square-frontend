import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { IoSettingsSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

import Dropdown from '../dropdowns/Dropdown';
import BackButton from '../buttons/BackButton';

import { useAuth } from "../../hooks/useAuth";
import { useRecognize } from '../../hooks/useRecognize';
import { useSidebar } from '../../hooks/useSidebar';

const GroupLocationsHeader = ({ group }) => {
    const { user, logout } = useAuth();
    const { isScanning } = useRecognize();
    const { setCollapse, collapse } = useSidebar();

    const navigate = useNavigate();

    const [showCreate, setCreate] = useState(false);
    const [showJoin, setJoin] = useState(false);

    return (
        <div className='group-locations-header'>
            <div className='group-info'>
                <BackButton text={"Groups"} onClick={() => {navigate('/groups')}}/>
                <div>
                    <div className='fs-1 fw-bold mb-2'>{group.name}</div>
                    <div className='fs-6 fw-bold'>{group.code}</div>
                </div>
            </div>
            <div className='group-actions'>
                <div className="header-icons" title='Members'>
                    <FaUserGroup
                        size={25}
                        onClick={() => { }}
                    />
                </div>
                <div className="header-icons" title='Edit Group'>
                    <IoSettingsSharp
                        size={25}
                        onClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
}

export default GroupLocationsHeader;

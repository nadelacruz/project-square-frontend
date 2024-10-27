import React, { useState, useEffect } from 'react';

import { IoSettingsSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

import Dropdown from '../dropdowns/Dropdown';

const GroupLocationsHeader = ({ group }) => {
    
    return (
        <div className='group-locations-header'>
            <div className='group-info'>
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

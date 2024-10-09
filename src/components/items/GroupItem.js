import React, { useState, useEffect } from 'react';
import { faceApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

const GroupItem = ({ group }) => {
    return (
        <div className='group-item'>
            <div className='ms-3 d-flex flex-column justify-content-center'>
                <span
                    className='opacity-75 text-truncate'
                    style={{fontSize: '12px'}}
                >Group</span>

                <span
                    className='fs-6 fw-bold text-truncate'
                    title={group.name}
                >{group.name}</span>
            </div>
        </div>
    )
}

export default GroupItem;
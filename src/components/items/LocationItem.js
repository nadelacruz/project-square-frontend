import React, { useState, useEffect } from 'react';
import { faceApiBaseUrl } from '../../api/square_api';
import { useNavigate } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa";

const LocationItem = ({ location }) => {
    const navigate = useNavigate(); 

    return (
        <div className='location-item' onClick={() => {navigate('/location/1')}}>
            <div className='ms-3 d-flex flex-column justify-content-center'>
                <span
                    className='opacity-75 text-truncate'
                    style={{fontSize: '12px'}}
                >Location</span>

                <span
                    className='fs-6 fw-bold text-truncate'
                >{location.name}</span>
            </div>
        </div>
    )
}

export default LocationItem;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationItem = ({ location, isOwner }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (isOwner) {
            navigate('/locations/' + location.id);
        } else {
            navigate('/records/locations' + 1);
        }
    }
    return (
        <div className='location-item' onClick={handleClick}>
            <div
                className='opacity-75 text-truncate'
                style={{ fontSize: '11px' }}
            >Location</div>

            <div
                className='fw-bold text-truncate'
            >{location.name}</div>
        </div>
    )
}

export default LocationItem;
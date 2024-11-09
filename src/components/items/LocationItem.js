import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationItem = ({ location, isOwner }) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        if(isOwner) {
            navigate('/locations/'+location.id);
        } else {
            navigate('/records/locations'+1);
        }
    }
    return (
        <div className='location-item' onClick={handleClick}>
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
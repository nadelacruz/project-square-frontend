import React from 'react';
import { useNavigate } from 'react-router-dom';


const GroupItem = ({ group }) => {
    const navigate = useNavigate(); 

    return (
        <div className='group-item fade-in' onClick={() => {navigate(`/groups/${group.id}`)}}>
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
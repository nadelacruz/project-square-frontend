import React, { useState, useEffect } from 'react';


const MemberItem = ({ member }) => {

    return (
        <div className='member-item' onClick={() => { }}>
            <div className='d-flex align-items-center'>
                <div className='member-profile-div'>
                    <img src='/images/user_default.jpg' alt='Member image' />
                </div>
                <span
                    className='fs-6 ms-3 text-truncate'
                >{member.email}</span>
            </div>
        </div>
    )
}

export default MemberItem;
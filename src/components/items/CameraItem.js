import React, { useState, useEffect } from 'react';


const CameraItem = ({ camera }) => {

    return (
        <div className='camera-item' onClick={() => { }}>
            <div className='ms-3 d-flex flex-column justify-content-center'>
                <span
                    className='fs-6 fw-bold text-truncate'
                >{camera.name}</span>

                <span
                    className='opacity-75 text-truncate'
                    style={{ fontSize: '12px' }}
                >{camera.ip}</span>

            </div>
        </div>
    )
}

export default CameraItem;
import React from 'react';

import { BiCctv } from "react-icons/bi";

const CameraItem = ({ camera }) => {

    return (
        <div className='camera-item' onClick={() => { }}>
            <div className='d-flex align-items-center'>
                <BiCctv size={32} style={{border: '2px solid gray', borderRadius: '3px', color: 'gray'}}/>
                <div className='ms-2'>
                    <div
                        className='fw-bold text-truncate'
                    >{camera.name}</div>

                    <div
                        className='opacity-75 text-truncate'
                        style={{ fontSize: '12px' }}
                    >{camera.ip}</div>
                </div>
            </div>
        </div>
    )
}

export default CameraItem;
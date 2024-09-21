import React, { useState, useEffect } from 'react';
import { faceApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

const RecognizedItem = ({ identityPath, detected, datetime}) => {
    const id_split = identityPath.split("\\");
    const identity = id_split[id_split.length - 1];
    return (
        <div className='queue-item box-shadow mb-2'>
            <div className='d-flex align-items-center' style={{width: 'fit-content'}}>
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={faceApiBaseUrl + "/face/detected-face/" + detected  }
                        alt={`input image`}
                    /> 
                </div>
                <FaArrowRight className='ms-2 me-2' size={24} />
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={faceApiBaseUrl + "/face/recognized-face/" + identity }
                        alt={`database image`}
                    />
                </div>
            </div>
            <div className='ms-3 d-flex flex-column justify-content-center'>
                <span
                    className='opacity-75 text-truncate'
                    style={{fontSize: '12px'}}
                >Student</span>

                <span
                    className='fs-6 fw-bold text-truncate'
                    title={identity}
                >{identity}</span>
                
                <span
                    className='small opacity-75 text-truncate'
                >{datetime}</span>
            </div>
        </div>
    )
}

export default RecognizedItem;
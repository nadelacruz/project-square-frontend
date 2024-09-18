import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { faceApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

const RecognizingLoadingItem = ({ detected }) => {
    return (
        <div className='loading-recognition-item animate-wave mb-2'>
            <div className='d-flex align-items-center' style={{ width: 'fit-content' }}>
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={faceApiBaseUrl + "/face/detected-face/" + detected}
                        alt={`input image`}
                    />
                </div>
                <FaArrowRight className='ms-2 me-2 opacity-50' size={24} />
                <div
                    className='loading-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                </div>
            </div>
            <div className='ms-3 w-100 d-flex flex-column'>
                <Placeholder className='w-25 mb-1' />
                <Placeholder className='w-75 mb-1' />
                <Placeholder className='w-50' />
            </div>
        </div>
    )
}

export default RecognizingLoadingItem;
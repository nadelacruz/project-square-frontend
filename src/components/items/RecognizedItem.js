import React, { useEffect, useState } from 'react';
import { faceApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

import { useIdentity } from '../../hooks/useIdentity';

const RecognizedItem = ({ unique_key, detected, datetime }) => {
    const { getIdentityImage } = useIdentity();

    const [img, setImg] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        getIdentityImage(unique_key).then((identity) => {
            setImg(identity.url);
            setName(identity.name); 
        });
    }, []);
    const id_split = unique_key.split("/");
    const identity = id_split[id_split.length - 1];


    return (
        <div className='queue-item box-shadow mb-2 fade-in'>
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
                <FaArrowRight className='ms-2 me-2' size={24} />
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={img}
                        alt={`database image`}
                    />
                </div>
            </div>
            <div className='ms-3 d-flex flex-column justify-content-center'>

                <span
                    className='fs-6 fw-bold text-truncate'
                    title={name}
                >{name}</span>

                <span
                    className='small opacity-75 text-truncate'
                >{datetime}</span>
            </div>
        </div>
    )
}

export default RecognizedItem;
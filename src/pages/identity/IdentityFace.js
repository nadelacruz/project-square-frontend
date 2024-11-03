import React, { useState, useRef } from 'react';

import ImageDropzone from '../../components/dropzones/ImageDropzone';

import { useNavigate } from 'react-router-dom';
import { useIdentity } from '../../hooks/useIdentity';

const IdentityFace = () => {
    const navigate = useNavigate();

    const {
        toggleCamera,
        faces,
        currentIndex,
        handleFaceImageclick,
        updateState,
        useCamera
    } = useIdentity();

    const handleImageDrop = (images) => {
        const faceImages = images.map((face) => URL.createObjectURL(face));
        const slotsToEnd = 5 - currentIndex;
        const slots = (faceImages.length <= slotsToEnd)? faceImages.length : slotsToEnd;
        
        const newFaces = [
            ...faces.slice(0, currentIndex), 
            ...faceImages.slice(0, slots),
            ...faces.slice(currentIndex + slots) 
        ];

        updateState({ faces: newFaces });
    }

    const FaceImage = ({ width, index }) => {
        const isActive = (currentIndex === index) ? 'active' : '';
        return (
            <div
                className={`identity-face-div ${isActive}`}
                style={{ width: `${width}` }}
                onClick={() => handleFaceImageclick(index)}
            >
                <img src={faces[index]} />
            </div>
        )
    };

    return (
        <>
            <div className='step-left-area'>
                <div className='fs-6'>Step 2 out of 4</div>
                <div className='step-title' >Face Images</div>

                <div className='fs-6 mb-2'>Default profile</div>
                <FaceImage width={'170px'} index={0} />

                <div className='fs-6 mb-2 mt-4'>Other face images</div>
                <div className='face-grid-display'>
                    <FaceImage width={'100%'} index={1} />
                    <FaceImage width={'100%'} index={2} />
                    <FaceImage width={'100%'} index={3} />
                    <FaceImage width={'100%'} index={4} />
                </div>

                <div className='d-flex align-items-center mt-5'>
                    <button
                        className='main-button me-4'
                        onClick={() => { navigate("/settings/identity/info") }}
                    >
                        Back
                    </button>
                    <button
                        className='main-button'
                        onClick={() => { navigate("/settings/identity/verify") }}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className='step-right-area'>
                {/* <div className='fs-5 mb-2' style={{ color: 'var(--primary-color)' }}>Default Profile</div> */}
                <ImageDropzone onImageDrop={handleImageDrop} initialImage={faces[currentIndex]} />
                {!useCamera && (
                    <button className="main-button rounded mt-3" onClick={toggleCamera}>Use Camera</button>
                )}
                {useCamera && (
                    <div className='d-flex align-items-center mt-3'>
                        <button className="main-button rounded me-3" onClick={toggleCamera}>Browse</button>
                        <button className="main-button rounded" onClick={() => { }}>Take Photo</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default IdentityFace;

import React, { useState, useRef } from 'react';

import ImageDropzone from '../../components/dropzones/ImageDropzone';

import { useNavigate } from 'react-router-dom';
import { useIdentity } from '../../hooks/useIdentity';

const IdentityFace = () => {
    const navigate = useNavigate();

    const {
        toggleCamera,
        faces,
        facePreviews,
        currentIndex,
        handleFaceImageclick,
        updateState,
        useCamera,
        capturePhoto
    } = useIdentity();

    const handleImageDrop = (images) => {
        const slotsToEnd = 5 - currentIndex;
        const slots = (images.length <= slotsToEnd)? images.length : slotsToEnd;
        
        const newFaces = [
            ...faces.slice(0, currentIndex), 
            ...images.slice(0, slots),
            ...faces.slice(currentIndex + slots) 
        ];

        const newPreviews = [
            ...newFaces.map((face) => (face)? URL.createObjectURL(face) : null),
        ];

        updateState({ faces: newFaces, facePreviews: newPreviews});
    }

    const FaceImage = ({ width, index }) => {
        const isActive = (currentIndex === index) ? 'active' : '';
        return (
            <div
                className={`identity-face-div ${isActive}`}
                style={{ width: `${width}` }}
                onClick={() => handleFaceImageclick(index)}
            >
                <img src={facePreviews[index]} />
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
                <ImageDropzone onImageDrop={handleImageDrop} initialImage={facePreviews[currentIndex]} index={currentIndex}/>
                {!useCamera && (
                    <button className="main-button rounded mt-3" onClick={toggleCamera}>Use Camera</button>
                )}
                {useCamera && (
                    <div className='d-flex align-items-center mt-3'>
                        <button className="main-button rounded me-3" onClick={toggleCamera}>Browse</button>
                        <button className="main-button rounded" onClick={() => {capturePhoto()}}>Take Photo</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default IdentityFace;

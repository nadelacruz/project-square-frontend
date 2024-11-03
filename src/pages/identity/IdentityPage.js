import React, { useState, useRef } from 'react';

import IdentityInfo from './IdentityInfo';
import IdentityFace from './IdentityFace';

const IdentityPage = ({content}) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const capturePhoto = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    {/* <div className='identity-setup-progress-area'>
            </div>
            <div className='identity-setup-content-area'>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                    />
                <button onClick={capturePhoto}>Capture Photo</button>
                {image && <img src={image} alt="Captured" />}
            </div> */}

    return (
        <div className='identity-setup-container'>
            <div className='step-main-container'>
                {content === "info" && (<IdentityInfo />)}
                {content === "face" && (<IdentityFace />)}
                {content === "verify" && (<IdentityInfo />)}
                {content === "finish" && (<IdentityInfo />)}
            </div>
        </div >
    );
};

export default IdentityPage;

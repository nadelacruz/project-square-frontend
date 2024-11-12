import React, { useEffect, useState } from 'react';

import { IoCloudDoneOutline } from "react-icons/io5";
import { FaRegIdBadge } from "react-icons/fa";

import { useIdentity } from '../../hooks/useIdentity';

const IdentityUpload = ({userId}) => {
    let isUploading = false;

    const [isFinished, setIsFinished] = useState(false);

    const {
        CAN_PROCEED_VERIFY,
        uploadIdentity,
        checkUploadIdentity,
        saveFaceEmbeddings,
        checkSaveFaceEmbeddings,
        setCurrentStep,
    } = useIdentity();

    useEffect(() => {
        if (!CAN_PROCEED_VERIFY) {
            setCurrentStep(0);
        } else {
            if (!isUploading) {
                isUploading = true
                handleIdentityUpload()
                    .then(() => {
                        isUploading = false;
                        setIsFinished(true);
                    });
            }
        }
    }, []);

    const handleIdentityUpload = async () => {
        const uploadTaskId = await uploadIdentity(userId);
        const uploadedImages = await checkUploadIdentity(uploadTaskId);

        for (const uploadedImage of uploadedImages) {
            const saveEmbeddingsTaskId = await saveFaceEmbeddings(uploadedImage.face_image_path, uploadedImage.unique_key);
            await checkSaveFaceEmbeddings(saveEmbeddingsTaskId);
        }
    }

    return (
        <>
            <div className='step-header-area'>
                <div className='fs-6'>Step 4 out of 4</div>
                <div className='step-title' >Upload</div>

                <div className='upload-status-container'>
                    <div className='upload-svg'>
                        {!isFinished && (<img src='/svg/upload-animate.svg' className='animate-wave '/>)}
                        {isFinished && (<img src='/svg/done-animate.svg' />)}
                    </div>
                    <div className='upload-svg'>
                        {!isFinished && (
                            <div className='fs-3 animate-wave' style={{ fontWeight: '400' }}>
                                <FaRegIdBadge size={130} color='var(--primary-color)'/>
                                <div className='mt-3'>Remembering your identity...</div>
                            </div>
                        )}
                        {isFinished && (
                            <>
                                <div className='fs-2 mb-5' style={{ fontWeight: '400' }}>
                                    <IoCloudDoneOutline size={100} color='var(--primary-color)'/>
                                    <div>Identity setup done!</div>
                                </div>
                                <button
                                    className='main-button rounded'
                                    disabled={!isFinished}
                                    onClick={() => { window.location.replace('/dashboard')}}
                                    style={{
                                        fontSize: '25px',
                                    }}
                                >
                                    Finish
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default IdentityUpload;

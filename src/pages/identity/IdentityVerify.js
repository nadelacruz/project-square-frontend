import React, { useEffect } from 'react';

import { useIdentity } from '../../hooks/useIdentity';

const IdentityVerify = () => {

    const {
        facePreviews,
        firstName,
        middleName,
        lastName,
        CAN_PROCEED_VERIFY,
        setCurrentStep,
        onStepBackClick,
        onStepNextClick
    } = useIdentity();

    useEffect(() => {
        if (!CAN_PROCEED_VERIFY) {
            setCurrentStep(0);
        }
    }, []);

    const FaceImage = ({ width, index }) => {
        const hasSrc = (facePreviews[index]) ? 'with-source' : '';
        return (
            <div
                className={`identity-face-div ${hasSrc}`}
                style={{ width: `${width}` }}
                onClick={() => { }}
            >
                <img src={facePreviews[index]} />
            </div>
        )
    };


    return (
        <>
            <div className='step-header-area'>
                <div className='fs-6'>Step 3 out of 4</div>
                <div className='step-title' >Verify</div>
            </div>
            <div className='step-left-area'>
                <div className='face-selection-grid verify'>
                    <div className='face-selection-default-area'>
                        <div className='fs-6 mb-2' style={{ fontWeight: '600' }}>Default profile</div>
                        <FaceImage width={'100%'} index={0} />
                    </div>
                    <div className='face-selection-reminders-area'>
                        <div className='verify-info-container'>
                            <div className='verify-info-section'>
                                <div className='small'>First name</div>
                                <div className='fs-5 fw-bold text-truncate' >{firstName}</div>
                            </div>

                            <div className='verify-info-section'>
                                <div className='small'>Middle name</div>
                                <div className='fs-5 fw-bold' >{middleName}</div>
                            </div>

                            <div className='verify-info-section'>
                                <div className='small'>Lastname</div>
                                <div className='fs-5 fw-bold' >{lastName}</div>
                            </div>
                        </div>
                    </div>
                    <div className='face-selection-others-area'>
                        <div className='fs-6 mb-2 mt-4' style={{ fontWeight: '600' }}>Other face images</div>
                        <div className='face-grid-display'>
                            <FaceImage width={'100%'} index={1} />
                            <FaceImage width={'100%'} index={2} />
                            <FaceImage width={'100%'} index={3} />
                            <FaceImage width={'100%'} index={4} />
                        </div>
                    </div>
                </div>

                <div className='d-flex align-items-center mt-5'>
                    <button
                        className='main-button me-4'
                        onClick={onStepBackClick}
                    >
                        Back
                    </button>
                    <button
                        className='main-button'
                        onClick={onStepNextClick}
                    >
                        Upload Identity
                    </button>
                </div>
            </div>

            <div className='step-right-area'>
                <img src='/svg/to-do-list-animate.svg' alt="img" />
            </div>
        </>
    );
};

export default IdentityVerify;

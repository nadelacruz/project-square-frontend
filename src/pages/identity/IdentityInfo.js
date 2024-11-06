import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIdentity } from '../../hooks/useIdentity';

const IdentityInfo = () => {
    const navigate = useNavigate();

    const {
        updateState,
        handleChange,
        handleToast,
        firstName,
        middleName,
        lastName,
        IDENTITY_PAGES,
        CAN_PROCEED_FACE
    } = useIdentity();

    const handleNextClick = () => {
        if (!CAN_PROCEED_FACE) {
            handleToast('Please complete the fields!', 'error');
            return;
        } else {
            navigate(IDENTITY_PAGES.FACE);
        }
    };

    return (
        <>
            <div className='step-header-area'>
                <div className='fs-6'>Step 1 out of 4</div>
                <div className='step-title'>Personal Info</div>
            </div>
            <div className='step-left-area'>
                <div className='small mb-2'>Firstname</div>
                <input
                    name='firstName'
                    type='text'
                    placeholder='First name'
                    value={firstName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="form-control identity-setup-input"
                />

                <div className='small mb-2'>Middle name</div>
                <input
                    name='middleName'
                    type='text'
                    placeholder='Middle name'
                    value={middleName}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    className="form-control identity-setup-input"
                />

                <div className='small mb-2'>Lastname</div>
                <input
                    name='lastName'
                    type='text'
                    placeholder='Last name'
                    value={lastName}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    className="form-control identity-setup-input"
                    style={{ marginBottom: '60px' }}
                />

                <div>
                    <button
                        className='main-button'
                        disabled={!CAN_PROCEED_FACE}
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className='step-right-area'>
                <img src='/svg/personal-site-animate.svg' alt="img" />
            </div>
        </>
    );
};

export default IdentityInfo;

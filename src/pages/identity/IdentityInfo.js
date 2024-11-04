import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIdentity } from '../../hooks/useIdentity';

const IdentityInfo = () => {
    const navigate = useNavigate();

    const {
        updateState,
        handleChange,
        handleToast,
        firstName,
        middleInitial,
        lastName,
    } = useIdentity();

    return (
        <>
            <div className='step-left-area'>
                <div className='fs-6'>Step 1 out of 4</div>
                <div className='step-title' style={{ marginBottom: '50px' }} >Personal Info</div>

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

                <div className='small mb-2'>Middle initial</div>
                <input
                    name='middleInitial'
                    type='text'
                    placeholder='Middle initial'
                    value={middleInitial}
                    onChange={handleChange}
                    maxLength={1}
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

                <button
                    className='main-button'
                    onClick={() => { navigate("/settings/identity/face") }}
                >
                    Next
                </button>
            </div>

            <div className='step-right-area'>
                <img src='/svg/personal-site-animate.svg' alt="img" />
            </div>
        </>
    );
};

export default IdentityInfo;

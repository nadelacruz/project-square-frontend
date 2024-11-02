import React, { useState, useEffect, useRef } from 'react';
import square_api, { squareApiBaseUrl, serverIp } from '../api/square_api';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import MainHeader from '../components/headers/MainHeader';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container" >
            <ToastContainer />
            <MainHeader />

            <div className='content-area custom-scrollbar'>
                <div className='landing-container'>
                    <div className='w-50'>
                        {/* <div className='logo-div' style={{width: '150px'}}>
                            <img
                                src={"/images/resight2.png"}
                                alt={`resight logo`}
                            />
                        </div> */}
                        <div className='landing-text-bold'>
                            Security Using AI, <br /> Remembering Entities
                        </div>
                        <div className='landing-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <div className='d-flex flex-column w-50 align-items-center '>
                            <button className='landing-btn' onClick={() => { navigate('/auth/login') }}>
                                Get Started
                            </button>
                            <div className='auth-footer-container'>
                                <div
                                    className='cursor-pointer auth-text-footer'
                                    onClick={() => { }}>Terms of use</div>
                                <div
                                    style={{
                                        height: '20px',
                                        width: '1px',
                                        backgroundColor: 'var(--primary-color)',
                                        margin: '5px'
                                    }}
                                />
                                <div
                                    className='cursor-pointer auth-text-footer'
                                    onClick={() => { }}>Privacy Policy</div>
                            </div>
                        </div>
                    </div>
                    <div className='landing-img-div'>
                        <img 
                            src='/svg/security-animate.svg' 
                            alt={'https://storyset.com/web'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

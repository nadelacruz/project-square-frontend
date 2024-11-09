import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container" >
            <ToastContainer />

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
                            Security Using <span style={{color: 'var(--primary-color-light)'}}>AI</span>, 
                            <br /><span style={{color: 'var(--primary-color)'}}>Remembering</span> Entities
                        </div>
                        <div className='landing-text' style={{fontWeight: '100'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <div className='d-flex flex-column w-50 align-items-center '>
                            <button className='landing-btn' onClick={() => { navigate('/auth/login') }}>
                                Get Started
                            </button>
                            <div className='auth-footer-container'>
                                <div
                                    className='cursor-pointer auth-text-footer'
                                    style={{ color: 'var(--background-light)!important', fontWeight: '100' }}
                                    onClick={() => { }}>Terms of use</div>
                                <div
                                    style={{
                                        height: '20px',
                                        width: '0.5px',
                                        backgroundColor: 'var(--background-light)',
                                        margin: '10px'
                                    }}
                                />
                                <div
                                    className='cursor-pointer auth-text-footer'
                                    style={{ color: 'var(--background-light)!important', fontWeight: '100' }}
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

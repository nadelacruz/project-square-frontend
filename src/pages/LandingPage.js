import React, { useState, useEffect, useRef } from 'react';
import square_api, { squareApiBaseUrl, serverIp } from '../api/square_api';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';

import MainHeader from '../components/headers/MainHeader';

const LandingPage = () => {    

    return (
        <div className="listener-main-container" >
            <ToastContainer />
            <MainHeader />
            
            <div className='listener-main custom-scrollbar'>
                <div className='mt-5  ms-3 logo-text'>
                    Landing page
                </div>
            </div>

        </div>
    );
}

export default LandingPage;

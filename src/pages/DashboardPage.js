import React, { useState, useEffect, useRef } from 'react';

import MainContainer from '../components/containers/MainContainer';
import MainHeader from '../components/headers/MainHeader';

import { useNavigate } from 'react-router-dom';

// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

const DashboardPage = () => {

    const navigate = useNavigate();

    return (
        <MainContainer>
            <div className='dashboard-container'>
                <div className='dashboard-header-area'>
                    <MainHeader text="Dashboard"/>
                </div>
                <div style={{ width: '100%', height: '120px' }}>
                    <div className='dashboard-section'>

                    </div>
                </div>
            </div>
        </MainContainer>
    );
}

export default DashboardPage;

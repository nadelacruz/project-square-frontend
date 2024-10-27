import React, { useState, useEffect, useRef } from 'react';

import MainContainer from '../components/containers/MainContainer';
import MainBreadcrumbs from '../components/tabs/MainBreadcrumbs';

// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

const DashboardPage = () => {

    return (
        <MainContainer>
            <div className='location-container'>
                <MainBreadcrumbs />
            </div>
        </MainContainer>
    );
}

export default DashboardPage;

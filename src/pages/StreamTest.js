import React, { useState, useEffect, useRef } from 'react';
import square_api, { squareApiBaseUrl, serverIp } from '../api/square_api';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RtspFeed from '../components/feeds/RtspFeed';
import HlsFeed from '../components/feeds/HlsFeed';

import MainHeader from '../components/headers/MainHeader';

const StreamTest = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container" >
            <ToastContainer />

            <HlsFeed streamUrl={"http://localhost:5000/stream"} />
            {/* <RtspFeed streamUrl="http://localhost:5000/stream.m3u8"/> */}
        </div>
    );
}

export default StreamTest;

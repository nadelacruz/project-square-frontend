import React, { useState, useEffect, useRef } from 'react';
import face_api, { faceApiBaseUrl, serverIp } from '../../api/square_api';
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from "axios";
import ReactPlayer from 'react-player';

import Spinner from 'react-bootstrap/Spinner';

const RtspFeed = ({ streamUrl, serverIp, className }) => {
    const videoNode = useRef(null);

    const [rtspLoading, setRtspLoading] = useState(true);

    // const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.106:554/live/ch00_0"; // Appartment Network
    // const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

    // useEffect(() => {
    //     setRtspLoading(true);
    //     const getWsUrl = async () => await startRTSPFeed();

    //     getWsUrl().then((wsUrl) => {
    //         console.log(wsUrl);
    //         let canvas = document.getElementById("stream-canvas");
    //         const player = new JSMpeg.Player(String(wsUrl), {
    //             canvas: canvas,
    //             preserveDrawingBuffer: true,
    //             onVideoDecode: () => setRtspLoading(false),
    //             audio: false, // Disable audio
    //         });
    //     });

    //     return () => {
    //         stopRTSPFeed();
    //         setRtspLoading(true);
    //     }
    // }, []);

    const startRTSPFeed = async () => {
        const res = await axios.get(`http://${serverIp}:3002/stream/?rtsp=${streamUrl}`);
        return res.data.url;
    };

    const stopRTSPFeed = async () => {
        return await axios.get(`http://${serverIp}:3002/stop`);
    };

    return (
        <div className={`video-feed ${className}`}>
            {rtspLoading && (
                <Spinner
                    className='position-absolute'
                    animation="border"
                    variant="light"
                />
            )}
            <canvas id="stream-canvas" style={{ backgroundColor: 'black' }}></canvas>
        </div>
    )
}

export default RtspFeed;
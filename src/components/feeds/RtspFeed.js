import React, { useState } from 'react';

const RtspFeed = ({className }) => {

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

    // const startRTSPFeed = async () => {
    //     const res = await axios.get(`http://${serverIp}:3002/stream/?rtsp=${streamUrl}`);
    //     return res.data.url;
    // };

    // const stopRTSPFeed = async () => {
    //     return await axios.get(`http://${serverIp}:3002/stop`);
    // };

    return (
        <div className={`video-feed ${className}`}>
            <canvas id="stream-canvas" style={{ backgroundColor: 'black' }}></canvas>
        </div>
    )
}

export default RtspFeed;
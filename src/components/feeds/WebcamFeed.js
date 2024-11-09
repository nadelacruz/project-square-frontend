import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecognize } from '../../hooks/useRecognize';

const WebcamFeed = ({ onDetectChange, videoRef }) => {
    const canvasRef = useRef(null);
    const { isScanning } = useRecognize();
    const [detected, setDetected] = useState(0);
    const [stream, setStream] = useState(null);
    const location = useLocation();

    useEffect(() => {
        onDetectChange(detected);
    }, [detected, onDetectChange]);

    useEffect(() => {
        return () => {
            if (stream && location !== "/dashboard") {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                console.log("stopped camera");
            }
        };
    }, [location, stream]);


    const resizeCanvas = () => {
        if (videoRef.current && canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
        }
    };

    const startVideoStream = async () => {
        try {
            const webStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
                audio: false
            });
            setStream(webStream);
            videoRef.current.srcObject = webStream;

            videoRef.current.onloadedmetadata = () => {
                resizeCanvas();
            };
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };


    useEffect(() => {
        const initializeFaceDetection = async () => {
            await startVideoStream();
        };

        initializeFaceDetection();

        return () => {
        };
    }, []);

    return (
        <div className="video-feed">
            <video ref={videoRef} autoPlay playsInline muted />
            <canvas id="device-canvas" style={{ display: 'none' }}></canvas>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
    );
};

export default WebcamFeed;

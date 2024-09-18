import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle } from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import DashboardSidebar from '../components/sidebars/DashboardSidebar';
import MainHeader from '../components/headers/MainHeader';
import RecognizedItem from '../components/items/RecognizedItem';
import RecognizingLoadingItem from '../components/items/RecognizingLoadingItem';
import DetectingLoadingItem from '../components/items/DetectingLoadingItem';
import UnknownItem from '../components/items/UnknownItem';
import RtspFeed from '../components/feeds/RtspFeed';
import WebcamFeed from '../components/feeds/WebcamFeed';
import AttendanceList from '../components/lists/AttendanceList';

import { toDisplayText, toFilename } from '../services/DateFormatService';
import square_api from '../api/square_api';
import { useAuth } from '../hooks/useAuth';
import { useRecognize } from '../hooks/useRecognize';

// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

const DashboardPage = () => {
    const videoRef = useRef(null);

    const {
        updateScanState,
        detectFaces,
        recognizeFaces,
        handleToast,
        isScanning,
        status,
        datetime,
        detections,
        verifiedFaces,
        SCAN_STATUS
    } = useRecognize();

    const captureFrame = () => {
        return new Promise((resolve, reject) => {
            const canvas = document.getElementById("stream-canvas");
            requestAnimationFrame(() => {
                canvas.toBlob(resolve, 'image/png');
            });
        });
    };

    const captureDeviceFrame = () => {
        const video = videoRef.current;
        const canvas = document.getElementById("device-canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        return new Promise((resolve, reject) => {
            requestAnimationFrame(() => {
                canvas.toBlob(resolve, 'image/png');
            });
        });
    };

    const handleCapture = async () => {
        const newDate = new Date();

        try {
            const deviceImageBlob = await captureDeviceFrame();

            const { detectedFaces, date } = await detectFaces(deviceImageBlob, newDate);

            await recognizeFaces(detectedFaces, date);
        } catch (error) {
            console.error(error);
            handleToast(error.message, 'error');
        } finally {
            updateScanState({ isScanning: false, status: null, detections: null }); // Users can now logout
        }
    };

    const handleDetectChange = (detected) => {
        if (detected > 0 && !isScanning) { // to prevent loop call to BACKEND
            handleCapture();
        }
    }

    const renderScanStatus = () => {
        if (isScanning) {
            return (
                <div
                    className='scan-status d-flex align-items-center'
                >
                    <Spinner
                        className='me-2'
                        animation="border"
                        variant="light"
                        size='sm'
                    />
                    <span className='fs-6'>{status === SCAN_STATUS.DETECTING ? 'Detecting faces...' : 'Recognizing detections...'}</span>
                </div>
            );
        }

        if (detections && verifiedFaces.length > 0) {
            return (
                <div className='scan-status'>
                    <div className='d-flex align-items-center mb-2'>
                        <FaCheckCircle className='me-2' size={17} />
                        <span className='fs-6'>{detections.faces.length} face(s) were detected.</span>
                    </div>

                    <div className='d-flex align-items-center'>
                        <FaCheckCircle className='me-2' size={17} />
                        <span className='fs-6'>
                            {verifiedFaces.filter(face => face.identity).length} face(s) were recognized.
                        </span>
                    </div>
                </div>
            );
        }

        return null;
    };

    const renderDateTime = () => {
        return datetime && (
            <div className='fs-6 mb-3 opacity-75'>{datetime}</div>
        );
    };


    return (
        <div className="main-container">
            <ToastContainer />
            <MainHeader />
            <DashboardSidebar />

            <div className='content-area custom-scrollbar'>
                <div className='attendance-container'>
                    <div className='attendance-header-area'>
                        <RiLiveFill className='me-2' size={24} />
                        <span className='fs-5 fw-bold'>Live video feed</span>
                    </div>
                    <div className='feeds-area'>
                        <div className='feed-wrapper'>
                            <WebcamFeed
                                videoRef={videoRef}
                                onDetectChange={handleDetectChange}
                            />
                            {renderScanStatus()}
                        </div>
                    </div>
                    <div className="list-area custom-scrollbar">
                        <div className='attendance-list-wrapper'>
                            <div className='fs-4 fw-bold'>Attendance</div>
                            {renderDateTime()}
                            <AttendanceList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;

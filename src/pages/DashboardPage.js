import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle } from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import DashboardSidebar from '../components/sidebars/DashboardSidebar';
import MainHeader from '../components/headers/MainHeader';
import RecognizedItem from '../components/items/RecognizedItem';
import RecognizedLoadingItem from '../components/items/RecognizedLoadingItem';
import UnknownItem from '../components/items/UnknownItem';
import RtspFeed from '../components/feeds/RtspFeed';
import WebcamFeed from '../components/feeds/WebcamFeed';

import { toDisplayText, toFilename } from '../services/DateFormatService';
import square_api from '../api/square_api';
import { useAuth } from '../hooks/useAuth';



const SCAN_STATUS = {
    DETECTING: 'detecting',
    RECOGNIZING: 'recognizing'
};

const TOAST_CONFIG = {
    autoClose: 2500,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

const DashboardPage = () => {
    const { isDetecting, setIsDetecting } = useAuth();
    const videoRef = useRef(null);

    const [scanState, setScanState] = useState({
        isScanning: false,
        status: null,
        detection: null,
        datetime: null,
        verifiedFaces: []
    });

    const { isScanning, status, detection, datetime, verifiedFaces } = scanState;

    const updateScanState = (newState) => {
        setScanState(prevState => ({ ...prevState, ...newState }));
    };

    useEffect(() => {
        console.log(verifiedFaces);
    }, [verifiedFaces]);
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

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const recognizeFaces = async (faces, date) => {
        const formattedDate = toDisplayText(date);

        updateScanState({ status: SCAN_STATUS.RECOGNIZING });

        const response = await square_api.post('/face/recognize-faces', JSON.stringify(faces), {
            headers: { 'Content-Type': 'application/json' },
        });

        const results = response.data.results;

        const seenIds = new Set(verifiedFaces.map(face => face.identity || 'unknown'));
        const unseenIds = results.filter(face => !seenIds.has(face.identity));

        updateScanState({
            detection: faces,
            datetime: formattedDate,
            verifiedFaces: [...verifiedFaces, ...unseenIds]
        });
        
        if (!results.some(face => face.identity)) {
            throw new Error("No faces were recognized");
        }

        handleToast(`${results.filter(face => face.identity).length} face(s) were recognized`, 'info');

    };

    const handleCapture = async () => {
        const date = new Date();

        try {
            setIsDetecting(true); // Users can't logout while DETECTING
            updateScanState({
                isScanning: true,
                status: SCAN_STATUS.DETECTING,
                detection: null,
                datetime: null
            });

            const deviceImageBlob = await captureDeviceFrame();

            const captureData = new FormData();
            captureData.append('capturedFrames', deviceImageBlob, toFilename(date) + "_dvcam.png");
            captureData.append('datetime', date);

            const response = await square_api.post('/face/detect-faces', captureData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const detectedFaces = response.data;

            if (detectedFaces.faces.length === 0) {
                throw new Error("No faces were detected");
            }

            handleToast(`${detectedFaces.faces.length} face(s) were detected`, 'info');

            await recognizeFaces(detectedFaces, date);
        } catch (error) {
            console.error(error);
            handleToast(error.message, 'error');
        } finally {
            updateScanState({ isScanning: false, status: null });
            setIsDetecting(false); // Users can now logout
        }
    };

    const handleDetectChange = (detected) => {
        if (detected > 0 && !isScanning) {
            handleCapture();
        }
    }

    const renderRecognized = () => {
        return verifiedFaces.slice().reverse().map((face, index) => {
            if (face.identity !== null) {
                return (
                    <RecognizedItem
                        key={index}
                        identityPath={face.identity}
                        detected={face.detected}
                    />
                )
            } else {
                return (
                    <UnknownItem
                        key={index}
                        detected={face.detected}
                    />
                )
            }
        });
    };

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

        if (detection && verifiedFaces.length > 0) {
            return (
                <div className='scan-status'>
                    <div className='d-flex align-items-center mb-2'>
                        <FaCheckCircle className='me-2' size={17} />
                        <span className='fs-6'>{detection.faces.length} face(s) were detected.</span>
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

    const renderAttendanceList = () => {
        if (isScanning && verifiedFaces.length === 0) {
            return (
                <>
                    <RecognizedLoadingItem />
                    <RecognizedLoadingItem />
                    <RecognizedLoadingItem />
                </>
            );
        }

        if (isScanning && verifiedFaces.length > 0) {
            return (
                <>
                    <RecognizedLoadingItem />
                    {renderRecognized()}
                </>
            );
        }

        if (verifiedFaces.length === 0) {
            return (
                <div className='w-100'>
                    <span className='fs-6 opacity-50'>
                        Make sure that face is visible to the camera.
                    </span>
                </div>
            );
        }

        return renderRecognized();
    };

    // const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
    // const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

    // const [isScanning, setIsScanning] = useState(false);
    // const [scanStatus, setScanStatus] = useState(null);
    // const [detection, setDetection] = useState(null);
    // const [datetime, setDateTime] = useState(null);
    // const [verifiedFaces, setVerifiedFaces] = useState([]);

    // const handleCapture = async () => {
    //     setIsDetecting(true);
    //     setIsScanning(true);
    //     setDetection(null);
    //     // setVerifiedFaces([]); I FUCKING HATE YOU
    //     setDateTime(null)

    //     const date = new Date();
    //     const formattedDate = toDisplayText(date);

    //     // const imageBlob = await captureFrame();
    //     const deviceImageBlob = await captureDeviceFrame();

    //     const captureData = new FormData();
    //     // captureData.append('capturedFrames', imageBlob, toFilename(date) + "_ipcam.png");
    //     captureData.append('capturedFrames', deviceImageBlob, toFilename(date) + "_dvcam.png");
    //     captureData.append('datetime', date);

    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     };

    //     setDateTime(formattedDate);
    //     setScanStatus("detecting");

    //     await square_api.post('/face/detect-faces', captureData, config)
    //         .then((response) => {
    //             const newDetection = response.data;

    //             setDetection(newDetection);

    //             if (newDetection.faces.length == 0) {
    //                 toast.error("No faces were detected", {
    //                     autoClose: 2500,
    //                     closeOnClick: true,
    //                     hideProgressBar: true,
    //                     position: 'bottom-right'
    //                 });
    //             } else {
    //                 toast.info(newDetection.faces.length + " face(s) were detected", {
    //                     autoClose: 2500,
    //                     closeOnClick: true,
    //                     hideProgressBar: true,
    //                     position: 'bottom-right'
    //                 });
    //             }

    //             return newDetection;
    //         }).then(async (detection) => {
    //             setScanStatus("recognizing");
    //             const response = await square_api.post('/face/recognize-faces', JSON.stringify(detection), {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const results = response.data.results
    //             console.log(results);
    //             if (results.filter((face) => face.identity).length === 0) {
    //                 toast.error("No faces were recognized", {
    //                     autoClose: 2500,
    //                     closeOnClick: true,
    //                     hideProgressBar: true,
    //                     position: 'bottom-right'
    //                 });
    //             } else {
    //                 toast.info(results.filter((face) => face.identity).length + " face(s) were recognized", {
    //                     autoClose: 2500,
    //                     closeOnClick: true,
    //                     hideProgressBar: true,
    //                     position: 'bottom-right'
    //                 });
    //             }

    // setVerifiedFaces(prevFaces => {
    //     const seenIds = new Set(prevFaces.map(face => face.identity || ''));
    //     return [
    //         ...prevFaces,
    //         ...results.filter(face => !seenIds.has(face.identity))
    //     ];
    // });

    //             return results;
    //         }).finally(() => {
    //             setIsScanning(false);
    //             setScanStatus(null);
    //             setIsDetecting(false);
    //         })

    // }




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
                            {renderAttendanceList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;

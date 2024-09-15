import React, { useState, useEffect, useRef } from 'react';
import square_api from '../api/square_api';
import { toDisplayText, toFilename } from '../services/DateFormatService';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import MainHeader from '../components/headers/MainHeader';
import DashboardSidebar from '../components/sidebars/DashboardSidebar';

import RecognizedItem from '../components/items/RecognizedItem';
import RecognizedLoadingItem from '../components/items/RecognizedLoadingItem';
import UnknownItem from '../components/items/UnknownItem';

import RtspFeed from '../components/feeds/RtspFeed';
import WebcamFeed from '../components/feeds/WebcamFeed';

import { RiLiveFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

import { useAuth } from '../hooks/useAuth';


const DashboardPage = () => {
    const { isDetecting, setIsDetecting } = useAuth();
    const videoRef = useRef(null);

    // const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
    // const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState(null);
    const [detection, setDetection] = useState(null);
    const [datetime, setDateTime] = useState(null);
    const [verifiedFaces, setVerifiedFaces] = useState([]);


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
        setIsDetecting(true);
        setIsScanning(true);
        setDetection(null);
        // setVerifiedFaces([]); I FUCKING HATE YOU
        setDateTime(null)

        const date = new Date();
        const formattedDate = toDisplayText(date);

        // const imageBlob = await captureFrame();
        const deviceImageBlob = await captureDeviceFrame();

        const captureData = new FormData();
        // captureData.append('capturedFrames', imageBlob, toFilename(date) + "_ipcam.png");
        captureData.append('capturedFrames', deviceImageBlob, toFilename(date) + "_dvcam.png");
        captureData.append('datetime', date);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        setDateTime(formattedDate);
        setScanStatus("detecting");

        await square_api.post('/face/detect-faces', captureData, config)
            .then((response) => {
                const newDetection = response.data;

                setDetection(newDetection);

                if (newDetection.faces.length == 0) {
                    toast.error("No faces were detected", {
                        autoClose: 2500,
                        closeOnClick: true,
                        hideProgressBar: true,
                        position: 'bottom-right'
                    });
                } else {
                    toast.info(newDetection.faces.length + " face(s) were detected", {
                        autoClose: 2500,
                        closeOnClick: true,
                        hideProgressBar: true,
                        position: 'bottom-right'
                    });
                }

                return newDetection;
            }).then(async (detection) => {
                setScanStatus("recognizing");
                const response = await square_api.post('/face/recognize-faces', JSON.stringify(detection), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const results = response.data.results
                console.log(results);
                if (results.filter((face) => face.identity).length === 0) {
                    toast.error("No faces were recognized", {
                        autoClose: 2500,
                        closeOnClick: true,
                        hideProgressBar: true,
                        position: 'bottom-right'
                    });
                } else {
                    toast.info(results.filter((face) => face.identity).length + " face(s) were recognized", {
                        autoClose: 2500,
                        closeOnClick: true,
                        hideProgressBar: true,
                        position: 'bottom-right'
                    });
                }

                setVerifiedFaces(prevFaces => {
                    const seenIds = new Set(prevFaces.map(face => face.identity || ''));
                    return [
                        ...prevFaces,
                        ...results.filter(face => !seenIds.has(face.identity))
                    ];
                });

                return results;
            }).finally(() => {
                setIsScanning(false);
                setScanStatus(null);
                setIsDetecting(false);
            })

    }

    const handleDetectChange = (detected) => {
        if (detected > 0 && !isScanning) {
            handleCapture();
        }
    }


    return (
        <div className="listener-main-container" >
            <ToastContainer />
            <MainHeader />
            <DashboardSidebar />

            <div className='listener-main custom-scrollbar'>
                <div className='attendance-container'>
                    <div className='d-flex align-items-center'>
                        <RiLiveFill className='me-2' size={24} />
                        <span className='fs-5 fw-bold'>Live video feed</span>
                    </div>
                    <div className='d-flex align-items-start w-100 mt-3' >
                        <div style={{ width: '60%' }}>
                            <div className='w-100 d-flex align-items-start'>
                                {/* <RtspFeed 
                                    className='me-2 mb-3 w-50'
                                    rtspUrl={rtspurl} 
                                /> */}
                                <WebcamFeed
                                    className={'ms-2'}
                                    videoRef={videoRef}
                                    // onDetectChange={() => { }}
                                    onDetectChange={handleDetectChange}
                                />
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                {/* <Button
                                    onClick={() => handleCapture()}
                                    disabled={isScanning}
                                    style={{
                                        backgroundColor: 'var(--primary-color)',
                                        fontSize: '18px',
                                        marginRight: '10px ',
                                    }}
                                >
                                    {(isScanning) ? "Taking attendance..." : "Take attendance"}
                                </Button> */}

                                {(isScanning && scanStatus === "detecting") && (
                                    <div className='d-flex align-items-center'>
                                        <Spinner
                                            className='me-2'
                                            animation="border"
                                            variant="dark"
                                            size='sm'
                                        />
                                        <span className='fs-6'>Detecting faces...</span>
                                    </div>
                                )}

                                {(isScanning && scanStatus === "recognizing") && (
                                    <div className='d-flex align-items-center'>
                                        <Spinner
                                            className='me-2'
                                            animation="border"
                                            variant="dark"
                                            size='sm'
                                        />
                                        <span className='fs-6'>Recognizing detections...</span>
                                    </div>
                                )}
                            </div>

                            {(detection && !isScanning) && (
                                <div className='d-flex align-items-center' style={{ color: 'green' }}>
                                    <FaCheckCircle className='me-2' size={17} />
                                    <span className='fs-6'>{(detection) ? detection.faces.length : ''} face(s) were detected.</span>
                                </div>

                            )}

                            {(verifiedFaces.length > 0 && !isScanning) && (
                                <div className='d-flex align-items-center' style={{ color: 'green' }}>
                                    <FaCheckCircle className='me-2' size={17} />
                                    <span className='fs-6'>
                                        {verifiedFaces.filter((face) => face.identity).length} face(s) were recognized.
                                    </span>
                                </div>
                            )}

                        </div>
                        <div className="attendance-list-container custom-scrollbar" style={{ width: '40%' }}>
                            <div className='attendance-content-wrapper'>
                                <div className='fs-4 fw-bold'>Attendance</div>
                                {/* Part that displays date and time of detection */}
                                {datetime && (
                                    <div className='fs-6 mb-3 opacity-75'>{datetime}</div>
                                )}
                                {/* Loading animation when there are already verified faces */}
                                {isScanning && (
                                    <div>
                                        <RecognizedLoadingItem />
                                    </div>
                                )}
                                {/* List of verified faces  */}
                                {(verifiedFaces.length > 0) && (
                                    renderRecognized()
                                )}
                                {/* initial message before automatic scanning */}
                                {(!(verifiedFaces.length > 0) && !isScanning) && (
                                    <div className='w-100'>
                                        <span className='fs-6 opacity-50'>
                                            Make sure that face is visible to the camera.
                                        </span>
                                    </div>
                                )}
                                {/* Loading animation when there are NO verified faces */}
                                {(isScanning && !(verifiedFaces.length > 0)) && (
                                    <div>
                                        <RecognizedLoadingItem />
                                        <RecognizedLoadingItem />
                                        <RecognizedLoadingItem />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardPage;

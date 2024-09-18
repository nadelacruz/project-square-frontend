import React, { useState, useEffect } from 'react';
import { useRecognize } from '../../hooks/useRecognize';
import RecognizedItem from '../items/RecognizedItem';
import RecognizingLoadingItem from '../items/RecognizingLoadingItem';
import DetectingLoadingItem from '../items/DetectingLoadingItem';
import UnknownItem from '../items/UnknownItem';

const AttendanceList = () => {
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

    const [list, setList] = useState(
        <div className='w-100'>
            <span className='fs-6 opacity-50'>
                Make sure that face is visible to the camera.
            </span>
        </div>
    );

    useEffect(() => {
        if (verifiedFaces.length === 0) {
            if (isScanning) {
                if (detections) {
                    setList(
                        <>
                            {renderDetected()}
                        </>
                    );
                } else {
                    setList(
                        <>
                            <DetectingLoadingItem />
                            <DetectingLoadingItem />
                            <DetectingLoadingItem />
                        </>
                    );
                }
            } 
        } else {
            if (isScanning) {
                if (detections) {
                    setList(
                        <>
                            {renderDetected()}
                            {renderRecognized()}
                        </>
                    );
                } else {
                    setList(
                        <>
                            <DetectingLoadingItem />
                            {renderRecognized()}
                        </>
                    );
                }
            } else {
                setList(
                    <>
                        {renderRecognized()}
                    </>
                );
            }
        }
    }, [detections, isScanning, verifiedFaces]);

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

    const renderDetected = () => {
        return detections.faces.map((face, index) => {
            return (
                <RecognizingLoadingItem
                    key={index}
                    detected={face.face_id}
                />
            )
        });
    }

    return (
        <>
            {list}
        </>
    );
}

export default AttendanceList;

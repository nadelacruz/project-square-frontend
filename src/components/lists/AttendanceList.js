import React, { useState, useEffect } from 'react';
import { useRecognize } from '../../hooks/useRecognize';
import RecognizedItem from '../items/RecognizedItem';
import RecognizingLoadingItem from '../items/RecognizingLoadingItem';
import DetectingLoadingItem from '../items/DetectingLoadingItem';
import UnknownItem from '../items/UnknownItem';

const AttendanceList = () => {
    const {
        updateScanState,
        handleToast,
        isScanning,
        status,
        detections,
        verifiedFaces,
    } = useRecognize();

    const [list, setList] = useState( // Initial list when there are none recognized yet
        <div className='w-100'>
            <span className='fs-6 opacity-50'>
                Make sure that faces are visible to the camera.
            </span>
        </div>
    );

    useEffect(() => {
        if (verifiedFaces.length === 0) {
            if (isScanning) {
                if (!detections) {
                    setList( // First detection start, loading items
                        <>
                            <DetectingLoadingItem />
                            <DetectingLoadingItem />
                            <DetectingLoadingItem />
                        </>
                    );
                } else {
                    setList( // First recognition start, showing list of detected
                        <>
                            {renderDetected()}

                        </>
                    );
                }
            }
        } else {
            if (isScanning) {
                if (!detections) {
                    setList( // Subsequent detection start, with recognized list below
                        <>
                            <DetectingLoadingItem />
                            {renderRecognized()}
                        </>
                    );
                } else {
                    setList( // Subsequent recognition start, detected list with recognized below
                        <>
                            {renderDetected()}
                            {renderRecognized()}
                        </>
                    );
                }
            } else {
                setList( // Detection and recognition end, list of recognized and unknown items
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
                        datetime={face.datetime}
                    />
                )
            } else {
                return (
                    <UnknownItem
                        key={index}
                        detected={face.detected}
                        datetime={face.datetime}
                    />
                )
            }
        });
    };

    const renderDetected = () => {
        return detections.map((face, index) => {
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

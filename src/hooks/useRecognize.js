import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

import StorageService from "../services/StorageService";

import { toDisplayText, toFilename } from "../services/DateFormatService";


const RecognizeContext = createContext();

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

export const RecognizeProvider = ({ children }) => {

    const [scanState, setScanState] = useState({
        isScanning: false,
        status: null,
        detections: null,
        datetime: null,
        verifiedFaces: []
    });

    const { isScanning, status, detections, datetime, verifiedFaces } = scanState;

    const updateScanState = (newState) => {
        setScanState(prevState => ({ ...prevState, ...newState }));
    };

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const detectFaces = async (deviceImgBlob, date) => {
        updateScanState({
            isScanning: true,
            status: SCAN_STATUS.DETECTING,
            detections: null,
            datetime: null
        });

        // const deviceImageBlob = await captureDeviceFrame();

        const captureData = new FormData();
        captureData.append('capturedFrames', deviceImgBlob, toFilename(date) + "_dvcam.png");
        captureData.append('datetime', date);

        const results = await square_api.post('/face/detect-faces', captureData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const detectedFaces = results.data;
        console.log(detectedFaces);

        if (detectedFaces.faces.length === 0) {
            throw new Error("No faces were detected");
        }

        handleToast(`${detectedFaces.faces.length} face(s) were detected`, 'info');

        updateScanState({detections: detectedFaces});

        const response = {
            detectedFaces: detectedFaces,
            date: date
        }
        return response;
    };


    const recognizeFaces = async (faces, date) => {
        const formattedDate = toDisplayText(date);

        updateScanState({ status: SCAN_STATUS.RECOGNIZING });

        const payload = {
            faces: faces,
            datetime: formattedDate
        };
        
        const response = await square_api.post('/face/recognize-faces', JSON.stringify(payload), {
            headers: { 'Content-Type': 'application/json' },
        });

        const results = response.data.results;

        const seenIds = new Set(verifiedFaces.map(face => face.identity || 'unknown'));
        const unseenIds = results.filter(face => !seenIds.has(face.identity));

        updateScanState({
            datetime: formattedDate,
            verifiedFaces: [...verifiedFaces, ...unseenIds]
        });
        
        if (!results.some(face => face.identity)) {
            throw new Error("No faces were recognized");
        }

        handleToast(`${results.filter(face => face.identity).length} face(s) were recognized`, 'info');
    };

    const value = useMemo(
        () => ({
            updateScanState,
            detectFaces,
            recognizeFaces,
            handleToast,
            isScanning,
            status,
            datetime,
            detections,
            verifiedFaces,
            SCAN_STATUS,
        }),
        [scanState]
    );
    return <RecognizeContext.Provider value={value}>{children}</RecognizeContext.Provider>;
};

export const useRecognize = () => {
    return useContext(RecognizeContext);
};
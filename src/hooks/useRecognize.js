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
        detectId: null,
        date: null,
        recognizeId: null,
        datetime: null,
        verifiedFaces: [],
    });

    const { isScanning, status, detections, datetime, verifiedFaces } = scanState;
    const { detectId, recognizeId, date } = scanState;

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
            datetime: null,
        });

        // const deviceImageBlob = await captureDeviceFrame();

        const captureData = new FormData();
        captureData.append('capturedFrames', deviceImgBlob, toFilename(date) + "_dvcam.png");
        captureData.append('datetime', date);

        const results = await square_api.post('/face/detect-faces', captureData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const jobId = results.data.job_id;
        return jobId;
    };

    const checkDetectResults = async (detectTaskId) => {
        if (!detectTaskId) return;
        while (true) {
            try {
                const response = await square_api.get(`/face/task-result/${detectTaskId}`);

                if (response.data.state === "SUCCESS") {
                    const detectedFaces = response.data.result;

                    if (detectedFaces.length === 0) {
                        handleToast("No faces were detected", 'error');
                    }

                    handleToast(`${detectedFaces.length} face(s) were detected`, 'info');
                    updateScanState({ detections: detectedFaces, detectId: null });


                    return detectedFaces;
                }
            } catch (error) {
                console.error(`Error checking detect status ${detectTaskId}:`, error);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
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

        const jobId = response.data.job_id;

        const res = {
            recognizeTaskId: jobId,
            date: date,
        }
        return res;
    };


    const checkRecognizeResults = async (recognizeTaskId, date) => {
        if (!recognizeTaskId) return;
        while (true) {
            try {
                const response = await square_api.post(`/face/task-result/${recognizeTaskId}`);

                if (response.data.state === "SUCCESS") {
                    const recognizeResults = response.data.result;

                    const formattedDate = toDisplayText(date);

                    const seenIds = new Set(verifiedFaces.map(face => face.identity || 'unknown'));
                    const unseenIds = recognizeResults.filter(face => !seenIds.has(face.identity));

                    updateScanState({
                        verifiedFaces: [...verifiedFaces, ...unseenIds],
                    });

                    if (!recognizeResults.some(face => face.identity)) {
                        throw new Error("No faces were recognized");
                    }

                    handleToast(`${recognizeResults.filter(face => face.identity).length} face(s) were recognized`, 'info');

                    break;
                }
            } catch (error) {
                console.error(`Error checking recognize status ${recognizeTaskId}:`, error);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
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
            detectId,
            recognizeId,
            checkDetectResults,
            checkRecognizeResults,
        }),
        [scanState]
    );
    return <RecognizeContext.Provider value={value}>{children}</RecognizeContext.Provider>;
};

export const useRecognize = () => {
    return useContext(RecognizeContext);
};
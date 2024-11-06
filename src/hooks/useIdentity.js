import { createContext, useContext, useMemo, useEffect, useState, useCallback, useRef } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

import StorageService from "../services/StorageService";

const IdentityContext = createContext();

const TIMEOUT = 1000;

const IDENTITY_PAGES = {
    INFO: '/auth/register/identity/info',
    FACE: '/auth/register/identity/face',
    VERIFY: '/auth/register/identity/verify',
    FINISH: '/auth/register/identity/finish',
};

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const IdentityProvider = ({ children }) => {
    const webcamRef = useRef(null);

    const [useCamera, setUseCamera] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [state, setState] = useState({
        faces: [null, null, null, null, null],
        facePreviews: [null, null, null, null, null],
        firstName: '',
        middleName: '',
        lastName: '',
        inputErrors: {
            firstName: '',
            middleInitial: '',
            lastName: '',
        },
    });

    const { firstName, middleName, lastName, inputErrors } = state;
    const { faces, facePreviews } = state;

    const CAN_PROCEED_FACE = (
        firstName !== '' &&
        middleName !== '' &&
        lastName !== ''
    );

    const CAN_PROCEED_VERIFY = (
        firstName !== '' &&
        middleName !== '' &&
        lastName !== '' &&
        faces[0] !== null
    );


    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            inputErrors: {
                ...prevState.inputErrors,
                [field]: '',
            },
        }));
    };

    const uploadIdentity = async (user_id) => {
        const identityData = new FormData();
        identityData.append('first_name', firstName);
        identityData.append('middle_name', middleName);
        identityData.append('last_name', lastName);

        faces.map((face, index) => {
            const faceName = 'face' + (index + 1);
            const fileName = user_id + faceName + ".png";
            identityData.append(faceName, face, fileName);
        })

        const response = await square_api.post('/identity/upload', identityData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const jobId = response.data.job_id;
        return jobId;
    };

    const checkUploadIdentity = async (uploadTaskId) => {
        if (!uploadTaskId) return;
        while (true) {
            try {
                const response = await square_api.get(`/identity/upload-result/${uploadTaskId}`);

                if (response.data.state === "SUCCESS") {
                    const identity = response.data.result;

                    return identity;
                }
                if (response.data.state === "FAILURE") {
                    throw new Error("Identity pload task failed...");
                }
            } catch (error) {
                console.error(`Error checking identity upload status ${uploadTaskId}:`, error);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, TIMEOUT));
        }
    };


    useEffect(() => console.log(state), [state]);

    const base64ToBlob = (base64Data, contentType = "image/jpeg") => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    const capturePhoto = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64String = imageSrc.split(",")[1];

        const imageBlob = await base64ToBlob(base64String);

        const newFaces = state.faces;
        newFaces[currentIndex] = imageBlob;

        const newFacePreviews = [
            ...newFaces.map((face) => (face) ? URL.createObjectURL(face) : null),
        ]

        updateState({ faces: newFaces, facePreviews: newFacePreviews });
    }


    const handleFaceImageclick = (index) => setCurrentIndex(index);
    const toggleCamera = () => setUseCamera(!useCamera);

    const value = useMemo(
        () => ({
            updateState,
            handleChange,
            handleToast,
            toggleCamera,
            useCamera,
            firstName,
            middleName,
            lastName,
            faces,
            currentIndex,
            handleFaceImageclick,
            facePreviews,
            webcamRef,
            capturePhoto,
            IDENTITY_PAGES,
            CAN_PROCEED_FACE,
            CAN_PROCEED_VERIFY
        }),
        [state, useCamera, currentIndex]
    );
    return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
};

export const useIdentity = () => {
    return useContext(IdentityContext);
};
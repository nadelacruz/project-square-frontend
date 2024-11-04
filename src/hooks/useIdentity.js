import { createContext, useContext, useMemo, useEffect, useState, useCallback, useRef } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

import StorageService from "../services/StorageService";
import { data } from "@tensorflow/tfjs";


const IdentityContext = createContext();

const BUTTON_TEXT = {
    CREATE: 'Create',
    CREATING: 'Creating...',
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
        middleInitial: '',
        lastName: '',
        inputErrors: {
            firstName: '',
            middleInitial: '',
            lastName: '',
        },
    });


    const { firstName, middleInitial, lastName, inputErrors } = state;
    const { faces, facePreviews } = state;


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

    const capturePhoto = useCallback(async() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64String = imageSrc.split(",")[1];

        const imageBlob = await base64ToBlob(base64String);

        const newFaces = state.faces;
        newFaces[currentIndex] = imageBlob;

        const newFacePreviews = [
            ...newFaces.map((face) => (face)? URL.createObjectURL(face) : null),
        ]

        updateState({ faces: newFaces, facePreviews: newFacePreviews });
    }, [webcamRef, currentIndex]);

    
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
            middleInitial,
            lastName,
            faces,
            currentIndex,
            handleFaceImageclick,
            facePreviews,
            webcamRef,
            capturePhoto
        }),
        [state, useCamera, currentIndex]
    );
    return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
};

export const useIdentity = () => {
    return useContext(IdentityContext);
};
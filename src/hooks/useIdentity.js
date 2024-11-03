import { createContext, useContext, useMemo, useEffect, useState } from "react";
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

    const [useCamera, setUseCamera] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [state, setState] = useState({
        faces: [null, null, null, null],
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
    const { faces } = state;


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
        }),
        [state, useCamera, currentIndex]
    );
    return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
};

export const useIdentity = () => {
    return useContext(IdentityContext);
};
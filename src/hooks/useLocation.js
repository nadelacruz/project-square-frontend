import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

import StorageService from "../services/StorageService";
import { data } from "@tensorflow/tfjs";


const LocationContext = createContext();

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

export const LocationProvider = ({ children }) => {

    const [state, setState] = useState({
        group: null,
        locations: [],
        inputName: null,
        inputErrors: {
            inputName: ''
        }
    });


    const { inputName, inputErrors } = state;
    const { group, locations } = state;


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

    const getGroupLocations = async (group_id) => {
        const response = await square_api.get(`/groups/group-locations/${group_id}`);
        const freshGroupLocations = response.data;
        updateState({
            group: freshGroupLocations.group,
            locations: freshGroupLocations.locations
        })
    };

    const createLocation = async (location_name, group_id) => {
        const credentials = {
            location_name: location_name,
            group_id: group_id
        }
        const response = await square_api.post('/groups/create', credentials);

        if (response.status === 201) { // 201 = CREATED
            return response.data.location;
        } else {
            return false;
        }
    };

    const deleteLocation = async (location_id) => {
        const credentials = {
            location_id: location_id,
        }
        const response = await square_api.post('/groups/delete', credentials);

        if (response.status === 200) { // 200 = OK
            return true;
        } else {
            return false;
        }
    };

    const value = useMemo(
        () => ({
            updateState,
            handleChange,
            handleToast,
            inputName,
            inputErrors,
            BUTTON_TEXT,
            createLocation,
            deleteLocation ,
            group,
            locations,
            getGroupLocations
        }),
        [state]
    );
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const useLocation = () => {
    return useContext(LocationContext);
};
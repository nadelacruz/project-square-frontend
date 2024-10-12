import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

import StorageService from "../services/StorageService";


const GroupContext = createContext();

const BUTTON_TEXT = {
    CREATE: 'Create',
    CREATING: 'Creating...',
    JOIN: 'Join',
    JOINING: 'Joining...'
};

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const GroupProvider = ({ children }) => {

    const [state, setState] = useState({
        createdGroups: [],
        joinedGroups: [],
        inputCode: null,
        inputName: null,
        inputErrors: {
            inputCode: '',
            inputName: ''
        }
    });

    const { inputCode, inputName, inputErrors } = state;
    const { joinedGroups, createdGroups } = state;

    const [breadcrumbs, setBreadcrumbs] = useState([
        { label: 'Groups', link: '/groups' },
        { label: 'Dashboard', link: '/dashboard' },
    ]);

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

    const getCreatedGroups = async (user_id) => {
        const response = await square_api.get(`/groups/created-groups/${user_id}`);
        const freshCreatedGroups = response.data.created_groups;
        updateState({ createdGroups: freshCreatedGroups });
    };

    const getJoinedGroups = async (user_id) => {
        const response = await square_api.get(`/groups/joined-groups/${user_id}`);
        const freshJoinedGroups = response.data.joined_groups;
        updateState({ joinedGroups: freshJoinedGroups });
    };

    const createGroup = async (group_name, user_id) => {
        const credentials = {
            group_name: group_name,
            user_id: user_id
        }
        const response = await square_api.post('/groups/create', credentials);

        if (response.status === 201) { // 201 = CREATED
            return response.data.group;
        } else {
            return false;
        }
    };

    const joinGroup = async (group_code, user_id) => {
        const credentials = {
            group_code: group_code,
            user_id: user_id
        }
        const response = await square_api.post('/groups/join', credentials);

        if (response.status === 200) { // 200 = OK
            return response.data.group;
        } else {
            return false;
        }
    };

    const deleteGroup = async (group_id, owner_password) => {
        const credentials = {
            group_id: group_id,
            owner_password: owner_password
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
            inputCode,
            inputName,
            inputErrors,
            BUTTON_TEXT,
            breadcrumbs,
            createGroup,
            joinGroup,
            deleteGroup,
            getCreatedGroups,
            getJoinedGroups,
            createdGroups,
            joinedGroups,
        }),
        [state, breadcrumbs]
    );
    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export const useGroup = () => {
    return useContext(GroupContext);
};
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUserGroup } from "react-icons/fa6";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import MainContainer from '../../components/containers/MainContainer';

import HorizontalList from '../../components/lists/HorizontalList';
import GroupItem from '../../components/items/GroupItem';
import SectionHeader from '../../components/headers/SectionHeader';

import { useGroup } from '../../hooks/useGroup';
import { useAuth } from '../../hooks/useAuth';

const GroupsPage = () => {
    const videoRef = useRef();

    const { user } = useAuth();

    let isFetching = false;
    const {
        joinedGroups,
        createdGroups,
        getCreatedGroups,
        getJoinedGroups,
        inputCode,
        inputName,
        updateState
    } = useGroup();


    useEffect(() => {
        if (
            isFetching ||
            (inputCode !== null && inputName !== null) ||
            !user
        ) return;
        isFetching = true;
        try {
            getJoinedGroups(user.id).then(() => { isFetching = false; });
            getCreatedGroups(user.id).then(() => { isFetching = false; });
        } catch (error) {
            console.error(error);
        }
    }, [inputCode, inputName, user]);


    const renderJoinedGroups = () => {
        return joinedGroups.map((group, index) => {
            return (
                <GroupItem
                    group={group}
                    key={index}
                />
            )
        });
    };

    const renderCreatedGroups = () => {
        return createdGroups.map((group, index) => {
            return (
                <GroupItem
                    key={index}
                    group={group}
                />
            )
        });
    };

    return (
        <MainContainer>
            <div className='groups-container fade-in '>
                <div className='groups-joined-area'>
                    <SectionHeader
                        icon={<FaUserGroup className='me-2' size={24} />}
                        title={"Joined Groups"}
                        actions={
                            <>
                                <button
                                    className='main-button'
                                    onClick={() => {updateState({showJoin: true})}}
                                >Join group</button>
                            </>
                        }
                    />
                    {!joinedGroups && (
                        <div className=''>
                            No groups joined yet
                        </div>
                    )}
                    {joinedGroups && (
                        <div className='group-grid-display'>
                            {renderJoinedGroups()}
                        </div>
                    )}
                </div>
                <div className='groups-created-area'>
                    <SectionHeader
                        icon={<FaUserGroup className='me-2' size={24} />}
                        title={"Created Groups"}
                        actions={
                            <>
                                <button
                                    className='main-button'
                                    onClick={() => {updateState({showCreate: true})}}
                                >Create group</button>
                            </>
                        }
                    />
                    {!createdGroups && (
                        <div className=''>
                            No groups created yet
                        </div>
                    )}
                    {createdGroups && (
                        <div className='group-grid-display'>
                            {renderCreatedGroups()}
                        </div>
                    )}
                </div>
            </div>
        </MainContainer>
    );
}

export default GroupsPage;

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
        updateState,
        toggleCreateGroup,
        toggleJoinGroup,
        reload
    } = useGroup();


    useEffect(() => {
        if (
            !isFetching &&
            user
        ) {
            isFetching = true;
            try {
                getJoinedGroups(user.id).then(() => { isFetching = false; });
                getCreatedGroups(user.id).then(() => { isFetching = false; });
            } catch (error) {
                console.error(error);
            } 
        }
    }, [user, reload]);


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
                                    onClick={toggleJoinGroup}
                                >Join group</button>
                            </>
                        }
                    />
                    {joinedGroups.length === 0 && (
                        <div className=''>
                            No groups joined yet
                        </div>
                    )}
                    {joinedGroups.length > 0 && (
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
                                    onClick={toggleCreateGroup}
                                >Create group</button>
                            </>
                        }
                    />
                    {createdGroups.length === 0 && (
                        <div className=''>
                            No groups created yet
                        </div>
                    )}
                    {createdGroups.length > 0 && (
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

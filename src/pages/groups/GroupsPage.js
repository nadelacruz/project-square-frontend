import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUserGroup } from "react-icons/fa6";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import MainContainer from '../../components/containers/MainContainer';

import HorizontalList from '../../components/lists/HorizontalList';
import GroupItem from '../../components/items/GroupItem';

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
        inputName
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
        return createdGroups.map((group) => {
            return (
                <GroupItem
                    group={group}
                />
            )
        });
    };

    return (
        <MainContainer>
            <div className='groups-container'>
                <div className='groups-header-area'>
                    {/* <CustomBreadcrumbs breadcrumbs={breadcrumbs}/> */}
                </div>
                <div className='groups-joined-area'>
                    <div className='d-flex align-items-center mb-3'>
                        <FaUserGroup className='me-2' size={24} />
                        <span className='fs-5 fw-bold'>Joined Groups</span>
                    </div>
                    {!joinedGroups && (
                        <div className=''>
                            No groups joined yet
                        </div>
                    )}
                    {joinedGroups && (
                        <HorizontalList>
                            {renderJoinedGroups()}
                        </HorizontalList>
                    )}
                </div>
                <div className='groups-created-area'>
                    <div className='d-flex align-items-center mb-3'>
                        <FaUserGroup className='me-2' size={24} />
                        <span className='fs-5 fw-bold'>Created Groups</span>
                    </div>
                    {!createdGroups && (
                        <div className=''>
                            No groups created yet
                        </div>
                    )}
                    {createdGroups && (
                        <HorizontalList>
                            {renderCreatedGroups()}
                        </HorizontalList>
                    )}
                </div>
            </div>
        </MainContainer>
    );
}

export default GroupsPage;
